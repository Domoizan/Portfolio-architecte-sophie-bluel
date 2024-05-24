/**
 * construction structure fenetre modale selon type
 * type galerie default
 * type edit => modif d' projet existant
 * type new_projet => ajout d'un projet
 */

//const { title } = require("process")


class modale {

    _block=null
        _modale=null
            _content=null
                _head=null
                    _title=null
                    _btHeader=[]
                _main=null
                _sep=null
                _foot=null
                    _btFooter=[]

    /**
     * 
     * @param {HTMLDivElement} block cible de la fenetre modale
     * @param {string} type type de la fenêtre modale 
     * @opt {} options de la fenetre modale
     * 
     */
    constructor(block,type="galerie",opt={
        modale : {
            id:"modale",
            class:"modale"
        },
        content:{
            id:"content",
            class:"modale__content"
        },
        header:{
            id:"header",
            class:"modale__header",
            title:"Galerie",
            bt:[{
                id:"btClose",
                class:"btclose",
                content:'<i class="fa-solid fa-xmark"></i>',// Libellé du bouton ou icone 
                evtfct:[{ evt:"click", fct: CloseModale }] /* tableau d'objet [{ evt:"event", fct:function ] }*/
                },{
                id:"btBack",
                class:"btBack hidden",
                content:'<i class="fa-solid fa-arrow-left"></i>',// Libellé du bouton ou icone 
                evtfct:[{ evt:"click", fct: editGalerie }] /* tableau d'objet [{ evt:"event", fct:function ] }*/  
                }]
        },
        main:{
            id:"main",
            class:"modale__gallery",
            //innerhtml:null //contenu vide
            innerhtml:[{elt:null,att:{name:"",val:""}}] //HTMLElement du contenu a afficher
        },
        separateur:{
            id:"sep",
            class:"modale__hr",
        },
        footer:{
            id:"footer",
            class:"modale__footer"
        },
        cta:{
            id:"bt_commit",
            class:"modale__button",
            Content:"Ajout photo",
            evtfct:[{ evt:"click", fct: formAjoutPhoto }] /* tableau d'objet [{ evt:"event", fct:function ] }*/
        }
    }){
        this._block=block
        this.CreatEltModale(opt)
    }

    CreatEltModale(opt){
        /* fenêtre modale */
        let modale=document.createElement("div")
        modale.setAttribute("class",opt.modale.class)
        modale.setAttribute("id",opt.modale.id)
        modale.setAttribute("aria-hidden","true")
        modale.setAttribute("role","dialog")
        modale.setAttribute("aria-labelledby",`${opt.header.title}_title`)
        modale.setAttribute("style","display:none;")
        this._modale=modale
        /* contenu affichable */
        const content=document.createElement("div")
        content.setAttribute("id",opt.content.id)
        content.setAttribute("class",opt.content.class)
        this._content=content
        /* header */
        const head=document.createElement("header")
        head.setAttribute("id",opt.header.id)
        head.setAttribute("class",opt.header.class)
        this._head=head
        this._title=document.createElement("h2")
        this._title.setAttribute("id",`${opt.header.title}_title`)
        this._title.appendChild(document.createTextNode(opt.header.title))
        /* bt header */
        opt.header.bt.forEach(elt => {
            this.CreatButton(elt,this._btHeader)
        })
        /* main */
        const main=document.createElement("div")
        this._main=main
        main.setAttribute("class",opt.main.class)
        main.setAttribute("id",opt.main.id)
        if(opt.innerhtml!==null) 
            { this.AppendHtmlContent(opt.main.innerhtml) }
        
        /* separateur */
        const sep=document.createElement("hr")
        sep.setAttribute("id",opt.separateur.id)
        sep.setAttribute("class",opt.separateur.class)
        this._sep=sep
        /* footer */
        const footer=document.createElement("footer")
        footer.setAttribute("id",opt.footer.id)
        footer.setAttribute("class",opt.footer.class)
        this._foot=footer
        /* CTA */
        this.CreatButton (opt.cta,this._btFooter)
    }

/**
 * 
 * @param {} opt options du boutons -> cta pour footer et bt pour header
 * @param {*} cible btFooter pour le footer et btHeader pour header
 */
    CreatButton (opt, cible){
        const bt=document.createElement("div")
        bt.setAttribute("id",opt.id)
        bt.setAttribute("class",opt.class)
        bt.innerHTML=opt.content
        if(opt.evtfct!==null)
            opt.evtfct.forEach(element => {
                bt.addEventListener(element.evt,element.fct)
            }); 
        cible.push(bt)
    }


    /*
           _modale=null
            _content=null
                _head=null
                    _title=null
                    _btClose
                    _btBack
            _main=null
            _sep=null
            _foot=null
                _bt=null
    */

    /* assemblage de la fenetre modale */
    CreatModale(){
        this._head.appendChild(this._title)
        this._btHeader.forEach(elt =>{
            this._head.appendChild(elt)
        })
        this._content.appendChild(this._head)
        this._content.appendChild(this._main)
        this._content.appendChild(this._sep)
        this._btFooter.forEach(elt =>{
            this._foot.appendChild(elt)
        })
        this._content.appendChild(this._foot)
        this._modale.appendChild(this._content)
    }

    
    /**
     * Ajout du contenu "tab_HTMLElement" dans block cible par default le block main
     * @param {} tab_HTMLElement tableau des elements html 
     */
    AppendHtmlContent(tab_HTMLElement, cible=this._main){ 
        tab_HTMLElement.forEach(element => {
            element.att.forEach(att =>{
                element.elt.setAttribute(att.name,att.val)
            } )
            cible.appendChild(element.elt)
        })
    }

    appendBlock(blk,cible=this._main){
        this.DelHtmmlContent(cible)
        cible.appendChild(blk)
    }

    ChangeHtmlContent(tab_HTMLElement, cible=this._main){
        this.DelHtmmlContent(cible)
        this.AppendHtmlContent(tab_HTMLElement, cible)
    }

    DelHtmmlContent(cible=this._main){
        while(cible.firstChild)cible.removeChild(cible.firstChild)
    }

    ChangeText(texte, cible){
        cible.removeChild(cible.firstChild)
        cible.appendChild(document.createTextNode(texte))
    }

    setAttr(attr,cible){
        attr.forEach(elt=>{
            cible.setAttribute(elt.name,elt.val)
        })
    }

    removeClass(classe,cible){
        cible.classList.remove(classe)
    }

    addClass(classe,cible){
        cible.classList.add(classe)
    }

    addEvent(events,cible){
        events.forEach(elt=>{
            cible.addEventListener(elt.evt,elt.fct)
        })
    }

    removeEvent(events,cible){
        events.forEach(elt=>{
            cible.removeEventListener(elt.evt,elt.fct)
        })
    }



    showModale(){
        this.CreatModale()
        this._block.appendChild(this._modale)
    }

}