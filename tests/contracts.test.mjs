import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readFile,stat} from 'node:fs/promises'
test('全部注册页面、双语与素材合同完整',async()=>{const m=JSON.parse(await readFile(new URL('../.tpl/template.json',import.meta.url)));assert.equal(m.surfaces.length,1);assert.equal(m.surfaces[0].pages.length,11);assert.equal(new Set(m.surfaces[0].pages.map(p=>p.slug)).size,m.surfaces[0].pages.length);assert.ok(m.surfaces[0].pages.every(p=>p.localizedTitles.en));for(const s of m.screenshots)assert.ok((await stat(new URL('../.tpl/'+s.src,import.meta.url))).size>0)})
