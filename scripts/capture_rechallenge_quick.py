from pathlib import Path
from datetime import datetime,timezone,timedelta
import csv,hashlib,json,re,time
from playwright.sync_api import sync_playwright

ROOT=Path('output_quick'); SC=ROOT/'screens'; META=ROOT/'meta'; SC.mkdir(parents=True,exist_ok=True); META.mkdir(parents=True,exist_ok=True)
JST=timezone(timedelta(hours=9)); UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/151 Safari/537.36'
SOURCES=[
('東京都','T003,T004,T005,T009,T010,T011,T012','https://www.metro.tokyo.lg.jp/information/press/2026/08/2026082406'),
('東京都保健医療局','T003,T006','https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/minkandantai'),
('東京都保健医療局','T003,T006','https://www.hokeniryo.metro.tokyo.lg.jp/kenkou/tokyokaigi/rinji1/hojojigyoukoubo'),
('内閣府NPO法人ポータル','T001,T002,T011','https://www.npo-homepage.go.jp/npoportal/gyosei-print/013006834'),
('テレビ朝日','T014,T003,T004,T009,T010,T011,T012','https://news.tv-asahi.co.jp/news_society/articles/000528420.html'),
('TBS NEWS DIG','T014,T003,T004,T009,T010,T011,T012','https://newsdig.tbs.co.jp/articles/-/2893309'),
('ライブドア・読売','T014,T004,T009,T010,T011','https://news.livedoor.com/article/detail/32165265/'),
('PR TIMES','T001,T002,T007,T008,T013','https://prtimes.jp/main/html/rd/p/000000008.000104320.html'),
('山脇美術専門学校','T007,T008,T013','https://yamawaki.ac.jp/2025/02/11/ijime-boshi-compe-vd/'),
('大田区立大森第三中学校','T007,T008','https://www.ota-school.ed.jp/oomoridai3-js/life/nikki/reiwa6/06060502.html'),
('公明党議員ブログ','T001,T002,T008,T013','https://www.komei.or.jp/km/miyajimasaiko/2016/11/27/%E5%AF%A9%E6%9F%BB%E7%99%BA%E8%A1%A8%E4%BC%9A/'),
('登竜門','T008,T013','https://compe.japandesign.ne.jp/jigyo-saisei-hyogo-2024/'),
('教育家庭新聞','T007,T008,T013','https://www.kknews.co.jp/news/20210914yt02'),
('旧公式サイト','T001,T002,T007,T008,T013','http://www.jigyo-saisei.com/'),
]
rows=[]; pages=[]; seen={}
def slug(s): return re.sub(r'[^0-9A-Za-z._-]+','_',s).strip('_')[:50] or 'page'
def sha(b): return hashlib.sha256(b).hexdigest()
def now(): return datetime.now(JST).isoformat(timespec='seconds')
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
 c=b.new_context(viewport={'width':1920,'height':1080},user_agent=UA,locale='ja-JP',timezone_id='Asia/Tokyo')
 for i,(media,targets,url) in enumerate(SOURCES,1):
  pg=c.new_page(); started=time.time(); found=saved=dup=exc=0; status='OK'; final=url
  try:
   resp=pg.goto(url,wait_until='domcontentloaded',timeout=45000); final=pg.url; pg.wait_for_timeout(1300)
   total=max(0,int(pg.evaluate('Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight')))
   positions=[]
   for frac in (0.0,0.28,0.56,0.84):
    y=int(total*frac)
    if any(abs(y-z)<150 for z in positions): continue
    positions.append(y); pg.evaluate(f'window.scrollTo(0,{y})'); pg.wait_for_timeout(500)
    data=pg.screenshot(type='png',full_page=False,animations='disabled'); h=sha(data); found+=1
    if h in seen:
     dup+=1; rows.append({'target_id':targets,'media':media,'source_page':url,'position':f'{frac:.2f}','status':'SHA_DUPLICATE','file':seen[h],'sha256':h,'width':1920,'height':1080,'captured_at':now()}); continue
    path=SC/f'q{i:02d}_{slug(media)}_{int(frac*100):02d}.png'; path.write_bytes(data); seen[h]=str(path); saved+=1
    rows.append({'target_id':targets,'media':media,'source_page':url,'position':f'{frac:.2f}','status':'SAVED','file':str(path),'sha256':h,'width':1920,'height':1080,'captured_at':now()})
   http=resp.status if resp else ''
  except Exception as e:
   status='ERROR'; http=''; exc+=1; rows.append({'target_id':targets,'media':media,'source_page':url,'position':'','status':'ERROR','file':'','sha256':'','width':'','height':'','captured_at':now(),'note':repr(e)[:200]})
  pages.append({'target_id':targets,'media':media,'page_url':url,'final_url':final,'status':status,'http_status':http,'found_total':saved+dup+exc,'saved':saved,'sha_duplicate':dup,'excluded':exc,'seconds':round(time.time()-started,2)})
  pg.close()
 c.close(); b.close()
def write(path,data):
 keys=[]
 for r in data:
  for k in r:
   if k not in keys: keys.append(k)
 with open(path,'w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=keys); w.writeheader(); w.writerows(data)
write(META/'screen_manifest.csv',rows); write(META/'page_reconciliation.csv',pages)
summary={'source_pages':len(SOURCES),'saved_screenshots':sum(r['status']=='SAVED' for r in rows),'sha_duplicates':sum(r['status']=='SHA_DUPLICATE' for r in rows),'generated_at_jst':now()}
(META/'summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8'); print(json.dumps(summary,ensure_ascii=False))
