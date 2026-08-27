from __future__ import annotations
import csv, hashlib, html, json, re, subprocess, sys, time
from pathlib import Path
from urllib.parse import urljoin, urlparse, unquote
import requests
from bs4 import BeautifulSoup
from PIL import Image

ROOT=Path('output2'); RAW=ROOT/'raw'; VID=ROOT/'videos'; FR=ROOT/'video_frames'; META=ROOT/'meta'
for d in (RAW,VID,FR,META): d.mkdir(parents=True,exist_ok=True)
S=requests.Session(); S.headers.update({'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36','Accept-Language':'ja,en-US;q=0.8'})
seen={}; assets=[]; pages=[]
PAGE_SEEDS=[
'https://news.tnc.co.jp/news/articles/NID2026082631803',
'https://www.fnn.jp/articles/-/1101815',
'https://news.tv-asahi.co.jp/news_society/articles/900197923.html',
'https://newsdig.tbs.co.jp/articles/-/2894388',
'https://newsdig.tbs.co.jp/articles/gallery/2894098?ex_id=2894098&ex_position=photo&image=1',
'https://newsdig.tbs.co.jp/articles/gallery/2793552',
'https://news.tnc.co.jp/news/articles/NID2026071031172',
'https://newsdig.tbs.co.jp/articles/rkb/2830179?display=1',
'https://newsdig.tbs.co.jp/articles/rkb/2828005',
'https://news.tv-asahi.co.jp/news_society/articles/900195751.html',
'https://mainichi.jp/graphs/20260825/mpj/00m/010/020000f/20260825mpj00m010043000p',
'https://www.gikai.pref.fukuoka.lg.jp/site/giin/etou-hideyuki.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/giin/kouzaki-satoshi.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/giin/yoshimatsu-motoaki.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/giin/hayashi-taisuke.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/giin/itabashi-satoshi.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/gichou/rekidai-g.html',
'https://www.gikai.pref.fukuoka.lg.jp/site/gichou/rekidai-fg.html',
'https://news.tnc.co.jp/news/articles/NID2026080531549',
'https://newsdig.tbs.co.jp/articles/rkb/2783458?display=1',
'https://newsdig.tbs.co.jp/articles/rkb/2808682?display=1',
'https://newsdig.tbs.co.jp/articles/rkb/2812429?display=1',
'https://newsdig.tbs.co.jp/articles/rkb/2793552?display=1',
'https://www.tvq.co.jp/news/news.html?did=2026080500000003',
'https://kbc.co.jp/movie/article.php?cdid=46680&cid=244&mid=76',
]
DIRECT=[
'https://image.news.livedoor.com/newsimage/stf/9/c/9c18e_1726_219b6a88_4412554d.jpg',
'https://news.cube-soft.jp/assets/out/images/jnn/2792837.jpg',
'https://up.gc-img.net/post_img_web/2026/08/9c5800e68ecfc56935c354498adde611_26546.jpeg',
]
VIDEO_IDS=['dZP2ENyxjuc','MViClbfU4Rg','7adsMG2Jwxg','-XjyLodK6tA','O5RJ5W1yaJQ','Ez42mdRFXis','yE0OdfJQyC0','vsIwCXyBfPs','4O6Zu5dcj4U','BTWa377bzeA','-M415LZisDw','h9XI8PKy0r8','gJaHV2SaF8g','AxZXiXpWbm0']

def sha(b): return hashlib.sha256(b).hexdigest()
def slug(s,n=100): return (re.sub(r'[^0-9A-Za-z._-]+','_',unquote(s)).strip('._') or 'asset')[:n]
def get(u): return S.get(u,timeout=45,allow_redirects=True)
def save_img(data,u,page,prefix,force=False):
    h=sha(data)
    if h in seen:
        assets.append({'source_page':page,'asset_url':u,'status':'SHA_DUPLICATE','file':seen[h],'sha256':h,'width':'','height':'','bytes':len(data)}); return
    ext=Path(urlparse(u).path).suffix.lower(); ext=ext if ext in {'.jpg','.jpeg','.png','.webp','.bmp','.tif','.tiff'} else '.jpg'
    p=RAW/f'{prefix}_{slug(Path(urlparse(u).path).name or "image")}_{h[:10]}{ext}'; p.write_bytes(data)
    try:
        with Image.open(p) as im: im.load(); w,hh=im.size
    except Exception as e:
        p.unlink(missing_ok=True); assets.append({'source_page':page,'asset_url':u,'status':'EXCLUDED_NOT_IMAGE','file':'','sha256':h,'width':'','height':'','bytes':len(data),'note':repr(e)[:200]}); return
    if not force and (w<500 or hh<280):
        p.unlink(missing_ok=True); assets.append({'source_page':page,'asset_url':u,'status':'EXCLUDED_LOW_RES','file':'','sha256':h,'width':w,'height':hh,'bytes':len(data)}); return
    seen[h]=str(p); assets.append({'source_page':page,'asset_url':u,'status':'SAVED','file':str(p),'sha256':h,'width':w,'height':hh,'bytes':len(data)})
def dl(u,page,prefix,force=False):
    try:
        r=get(u)
        if r.status_code!=200: assets.append({'source_page':page,'asset_url':u,'status':f'HTTP_{r.status_code}','file':'','sha256':'','width':'','height':'','bytes':len(r.content)}); return
        if 'text/html' in r.headers.get('content-type','').lower(): assets.append({'source_page':page,'asset_url':u,'status':'EXCLUDED_HTML','file':'','sha256':'','width':'','height':'','bytes':len(r.content)}); return
        save_img(r.content,r.url,page,prefix,force)
    except Exception as e: assets.append({'source_page':page,'asset_url':u,'status':'ERROR','file':'','sha256':'','width':'','height':'','bytes':'','note':repr(e)[:250]})
def crawl(u,i):
    t=time.time(); found=set()
    try:
        r=get(u); status=f'HTTP_{r.status_code}'
        if r.status_code!=200: pages.append({'page_url':u,'status':status,'found':0,'saved':0,'sha_duplicate':0,'excluded':0}); return
        text=r.text; soup=BeautifulSoup(text,'lxml')
        for tag in soup.find_all(['meta','img','source','a']):
            vals=[]
            if tag.name=='meta': vals=[tag.get('content')]
            elif tag.name=='a': vals=[tag.get('href')]
            else: vals=[tag.get(k) for k in ('src','data-src','data-original','data-lazy-src','data-image','content')]
            for v in vals:
                if v:
                    v=html.unescape(v).replace('\\/','/')
                    if re.search(r'\.(?:jpe?g|png|webp)(?:[?#].*)?$',v,re.I): found.add(urljoin(r.url,v))
            for key in ('srcset','data-srcset'):
                if tag.get(key):
                    for part in tag.get(key).split(','):
                        v=part.strip().split()[0].replace('\\/','/')
                        if re.search(r'\.(?:jpe?g|png|webp)(?:[?#].*)?$',v,re.I): found.add(urljoin(r.url,v))
        raw=html.unescape(text).replace('\\/','/')
        found.update(re.findall(r'https?://[^"\'<>\\s]+?\.(?:jpe?g|png|webp)(?:\?[^"\'<>\\s]*)?',raw,re.I))
        b=len(assets)
        for n,a in enumerate(sorted(found),1): dl(a,r.url,f'p{i:03d}_{n:03d}')
        nr=assets[b:]; sv=sum(x['status']=='SAVED' for x in nr); du=sum(x['status']=='SHA_DUPLICATE' for x in nr); ex=len(nr)-sv-du
        pages.append({'page_url':u,'final_page_url':r.url,'status':status,'found':len(found),'saved':sv,'sha_duplicate':du,'excluded':ex,'seconds':round(time.time()-t,2)})
    except Exception as e: pages.append({'page_url':u,'status':'ERROR','found':0,'saved':0,'sha_duplicate':0,'excluded':0,'note':repr(e)[:250]})

def write_csv(p,rs):
    keys=[]
    for r in rs:
        for k in r:
            if k not in keys: keys.append(k)
    with open(p,'w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=keys); w.writeheader(); w.writerows(rs)

for i,u in enumerate(DIRECT,1): dl(u,u,f'direct_{i:03d}',True)
for i,u in enumerate(PAGE_SEEDS,1): print('crawl',i,len(PAGE_SEEDS),u,flush=True); crawl(u,i)
video_rows=[]
for i,vid in enumerate(VIDEO_IDS,1):
    u='https://www.youtube.com/watch?v='+vid; print('video',i,len(VIDEO_IDS),u,flush=True)
    dl('https://i.ytimg.com/vi/'+vid+'/maxresdefault.jpg',u,'yt_'+vid,True)
    tpl=str(VID/'%(id)s_%(title).90B.%(ext)s')
    cmd=[sys.executable,'-m','yt_dlp','--no-playlist','--retries','3','--fragment-retries','3','-f','bestvideo[height<=720]+bestaudio/best[height<=720]','--merge-output-format','mp4','--write-info-json','--write-thumbnail','--convert-thumbnails','jpg','--max-filesize','220M','-o',tpl,u]
    try:
        cp=subprocess.run(cmd,text=True,capture_output=True,timeout=900)
        files=[str(p) for p in sorted(VID.glob(vid+'_*'))]
        media=[p for p in sorted(VID.glob(vid+'_*')) if p.suffix.lower() in {'.mp4','.mkv','.webm','.mov','.m4v'}]
        frames=[]
        if media:
            pr=subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',str(media[0])],text=True,capture_output=True,timeout=60)
            try: dur=float(pr.stdout.strip())
            except: dur=0
            for j,frac in enumerate((.12,.35,.58,.82),1):
                sec=max(.5,dur*frac) if dur else j*2
                fp=FR/f'{vid}_frame_{j}_{int(sec):04d}s.jpg'
                subprocess.run(['ffmpeg','-y','-ss',f'{sec:.2f}','-i',str(media[0]),'-frames:v','1','-q:v','2',str(fp)],text=True,capture_output=True,timeout=120)
                if fp.exists(): frames.append(str(fp))
        video_rows.append({'video_id':vid,'url':u,'returncode':cp.returncode,'files':files,'frames':frames,'stderr_tail':cp.stderr[-1200:]})
    except Exception as e: video_rows.append({'video_id':vid,'url':u,'returncode':-1,'files':[],'frames':[],'stderr_tail':repr(e)})
inv=[]
for p in sorted(ROOT.rglob('*')):
    if not p.is_file() or p.suffix.lower() in {'.csv','.json'}: continue
    b=p.read_bytes(); h=sha(b); w=hh=''
    if p.suffix.lower() in {'.jpg','.jpeg','.png','.webp','.bmp','.tif','.tiff'}:
        try:
            with Image.open(p) as im: w,hh=im.size
        except: pass
    inv.append({'file':str(p),'sha256':h,'bytes':len(b),'width':w,'height':hh,'suffix':p.suffix.lower()})
write_csv(META/'asset_discovery.csv',assets); write_csv(META/'page_reconciliation.csv',pages); write_csv(META/'inventory.csv',inv)
(META/'video_status.json').write_text(json.dumps(video_rows,ensure_ascii=False,indent=2),encoding='utf-8')
summary={'pages':len(PAGE_SEEDS),'videos_requested':len(VIDEO_IDS),'saved_files':len(inv),'saved_images':sum(r.get('status')=='SAVED' for r in assets),'sha_duplicates':sum(r.get('status')=='SHA_DUPLICATE' for r in assets),'generated_at_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
(META/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8'); print(json.dumps(summary,ensure_ascii=False,indent=2))
