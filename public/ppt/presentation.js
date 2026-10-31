/* Static presentation controls. This page never calls the café's business API. */
'use strict';
const notesDialog=document.querySelector('#notes-dialog');
const chaptersDialog=document.querySelector('#chapters-dialog');
const sections=[...document.querySelectorAll('.slides>section')];
const titleOf=slide=>{const heading=slide.querySelector('h1,h2').cloneNode(true);heading.querySelectorAll('br').forEach(br=>br.replaceWith(' '));return heading.textContent.replace(/\s+/g,' ').trim();};
const sync=()=>{
 const slide=Reveal.getCurrentSlide();
 document.querySelector('#chapter-label').textContent=slide.dataset.chapter;
 document.querySelector('#slide-count').textContent=`${Reveal.getIndices().h+1} / ${sections.length}`;
 document.querySelector('#notes-slide-title').textContent=titleOf(slide);
 document.querySelector('#notes-content').textContent=slide.querySelector('.notes').textContent;
 document.querySelectorAll('#chapter-list button').forEach((button,index)=>button.setAttribute('aria-current',String(index===Reveal.getIndices().h)));
};
const openNotes=()=>{sync();notesDialog.showModal();};
const openChapters=()=>{sync();chaptersDialog.showModal();};
sections.forEach((slide,index)=>{
 const item=document.createElement('li'),button=document.createElement('button'),number=document.createElement('span'),label=document.createElement('b');
 button.type='button';number.textContent=String(index+1).padStart(2,'0');label.textContent=titleOf(slide);
 button.append(number,label);button.addEventListener('click',()=>{chaptersDialog.close();Reveal.slide(index);});item.append(button);document.querySelector('#chapter-list').append(item);
});
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
document.querySelector('#notes-button').addEventListener('click',openNotes);
document.querySelector('#chapters-button').addEventListener('click',openChapters);
let copyReset;
document.querySelector('#copy-server').addEventListener('click',async()=>{
 const label=document.querySelector('#copy-label'),status=document.querySelector('#copy-status');
 clearTimeout(copyReset);
 try{await navigator.clipboard.writeText('https://api.cyclist.cafe/mcp');label.textContent='Copied ✓';status.textContent='MCP server URL copied.';}
 catch{label.textContent='Select URL to copy';status.textContent='Clipboard unavailable. Select and copy the server address.';const range=document.createRange();range.selectNodeContents(document.querySelector('#copy-server code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);}
 copyReset=setTimeout(()=>{label.textContent='Copy server URL ↗';},2500);
});
Reveal.initialize({width:1280,height:720,margin:0.035,minScale:0.1,maxScale:1.5,hash:true,controls:true,progress:true,center:false,transition:matchMedia('(prefers-reduced-motion: reduce)').matches?'none':'fade',transitionSpeed:'fast',autoSlide:0,overview:true,touch:true,disableLayout:false,pdfMaxPagesPerSlide:1,pdfSeparateFragments:false,keyboardCondition:()=>!document.querySelector('dialog[open]'),keyboard:{83:openNotes,77:openChapters},help:true}).then(sync);
Reveal.on('slidechanged',sync);
