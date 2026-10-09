"""Render original OTM brand sculpture; intermediate renders stay on the D drive."""
import argparse
import json
import math
import os
import sys
import bpy
from mathutils import Vector

args_list = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else []
parser = argparse.ArgumentParser()
parser.add_argument('--output', required=True)
parser.add_argument('--frames', type=int, default=96)
args = parser.parse_args(args_list)
out = os.path.abspath(args.output)
if not out.lower().startswith('d:'):
    raise RuntimeError('Render evidence must be on the D drive.')
os.makedirs(out, exist_ok=True)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
cycles_preferences = bpy.context.preferences.addons['cycles'].preferences
cycles_preferences.compute_device_type = 'OPTIX'
cycles_preferences.get_devices()
gpu_devices = [device for device in cycles_preferences.devices if device.type == 'OPTIX']
if gpu_devices:
    for device in cycles_preferences.devices:
        device.use = device.type == 'OPTIX'
    scene.cycles.device = 'GPU'
    print('Render devices:', ', '.join(device.name for device in gpu_devices), flush=True)
scene.cycles.samples = 24
scene.cycles.use_denoising = True
scene.render.resolution_x = 1200
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.fps = 24
scene.world.color = (.025, .025, .025)
scene.view_settings.view_transform = 'AgX'

def material(name, color, metallic=0, roughness=.25):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value = (*color, 1)
    shader.inputs['Metallic'].default_value = metallic
    shader.inputs['Roughness'].default_value = roughness
    return mat

graphite = material('Graphite ceramic', (.035, .042, .038), .6, .23)
silver = material('Brushed aluminium', (.6, .63, .59), .85, .2)
orange = material('Vermilion ceramic', (.92, .105, .032), .32, .22)
floor = material('Charcoal seamless', (.014, .019, .016), .2, .5)
root = bpy.data.objects.new('OTM original sculpture', None)
scene.collection.objects.link(root)

def cube(name, location, scale, mat, bevel=.08):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    modifier = obj.modifiers.new('Machined edges', 'BEVEL')
    modifier.width = bevel
    modifier.segments = 4
    obj.modifiers.new('Weighted normals', 'WEIGHTED_NORMAL')
    obj.parent = root
    return obj

# Three open square structures form one connected, original assembly.
for index in range(3):
    mat = [graphite, silver, orange][index]
    offset = (-.7 + index * .65, index * .25, .3 + index * .35)
    side = 1.6
    thickness = .24
    for direction in [-1, 1]:
        cube(f'Frame {index} vertical {direction}', (offset[0] + direction * side / 2, offset[1], offset[2]), (thickness, .44, side + thickness), mat)
        cube(f'Frame {index} horizontal {direction}', (offset[0], offset[1], offset[2] + direction * side / 2), (side, .44, thickness), mat)
    if index == 0:
        cube('Integrated module', (offset[0] - .42, offset[1], offset[2] - .38), (.38, .5, .38), silver, .05)
root.rotation_euler = (.16, -.2, -.22)
root.location.z = 1.2
root.rotation_euler.z = -.22
root.keyframe_insert('rotation_euler', frame=1)
root.rotation_euler.z = -.22 + math.tau
root.keyframe_insert('rotation_euler', frame=args.frames + 1)
for curve in root.animation_data.action.fcurves:
    for key in curve.keyframe_points:
        key.interpolation = 'LINEAR'

bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -.4))
bpy.context.object.data.materials.append(floor)

def light(name, location, energy, size, color):
    data = bpy.data.lights.new(name, 'AREA')
    data.energy = energy
    data.shape = 'DISK'
    data.size = size
    data.color = color
    obj = bpy.data.objects.new(name, data)
    scene.collection.objects.link(obj)
    obj.location = location
    obj.rotation_euler = (Vector((0, 0, 1)) - obj.location).to_track_quat('-Z', 'Y').to_euler()

light('Large softbox', (1, -4, 7), 1100, 5, (1, .92, .84))
light('Silver rim', (-4, 2, 4), 1300, 4, (.77, .85, 1))
light('Warm edge', (4, 3, 2), 750, 3, (1, .38, .19))
bpy.ops.object.camera_add(location=(5, -8, 5.2))
camera = bpy.context.object
camera.rotation_euler = (Vector((0, .3, 1.3)) - camera.location).to_track_quat('-Z', 'Y').to_euler()
camera.data.type = 'ORTHO'
camera.data.ortho_scale = 6.8
scene.camera = camera
scene.frame_start = 1
scene.frame_end = args.frames
scene.frame_set(1)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(out, 'otm-interconnected-forms.blend'))
scene.render.filepath = os.path.join(out, 'sculpture-poster.png')
bpy.ops.render.render(write_still=True)
with open(os.path.join(out, 'source.json'), 'w', encoding='utf-8') as file:
    json.dump({'title': 'Interconnected Forms', 'authoring': 'Blender original procedural sculpture', 'kind': 'OTM brand artwork / self-initiated study', 'client_work': False, 'frames': args.frames, 'fps': 24}, file, indent=2)
print('OTM_POSTER_READY', flush=True)
scene.render.resolution_x = 800
scene.render.resolution_y = 600
scene.cycles.samples = 12
scene.render.filepath = os.path.join(out, 'frames', 'form_')
os.makedirs(os.path.join(out, 'frames'), exist_ok=True)
bpy.ops.render.render(animation=True)
