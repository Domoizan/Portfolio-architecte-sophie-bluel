/**
 * creation du code d'un formulaire
 * le formulaire peut contenir plusieurs block div lesquels rcevront les elements du formulaire
 * 
 */

class Form {
    _form=null
    _blocks=[]

    constructor(id){
        this._form=document.createElement("form")
        this.setattr([{name:"id",val:id}], this._form)
    }

    /**
     * 
     * @param {[{name:"string",val:"string"}]} tab_attr liste des attribut de l'elt cible
     * @param {HTMLElement} cible   Elément affecté  
     */
    setattr(tab_attr,cible){
        tab_attr.forEach(elt => {
            cible.setAttribute(elt.name,elt.val)
        })
    }

    /**
     * Ajout d'un block div dans l'elt cible
     * @param {} tab_attr liste des attributs du tag div
     * @param {HTMLElement} cible block parent
     * @returns HTMLElement 
     */

    Addblock(tab_attr,cible){
        let block=document.createElement("div")
        this.setattr(tab_attr,block)
        cible.appendChild(block)
        this._blocks.push(block)
        return block
    }

    /**
     * Ajout d'un tag html dans l'elt parent
     * @param {"string"} tag
     * @param {[{name:"string",val:"string"}]} tab_attr liste des attributs du tag
     * @param {HTMLElement} cible block parent
     * @param {[{evt:"event",fct:function}]} tab_events
     */
    AddElt(tag,tab_attr,cible,tab_events=null){
        let elt=document.createElement(tag)
        this.setattr(tab_attr,elt)
        if(tab_events!==null)this.addEvent(tab_events,elt)
        cible.appendChild(elt)
        return elt
    }

    /**
     * @param {[{name:"string",val:"string"}]} lstAttr liste des attributs du tag select
     * @param {[{text:"string",attr:[{name:"string",val:"string"}]}]} lstOpts liste des options et de leurs attributs
     * @param {HTMLElement} cible Block parent
     */
    AddSelect(lstAttr,lstOpts,cible,tab_events=null){
        let sel=document.createElement("select")
        this.setattr(lstAttr,sel)
        this.addOption(lstOpts,sel)
        if(tab_events!==null)this.addEvent(tab_events,sel)
        cible.appendChild(sel)
    }

    /**
     * Ajout d'option dans le tag cible
     * @param {[{text:"string",attr:[{name:"string",val:"string"}]}]} lstOpts liste des options et de leurs attributs
     * @param {HTMLElement} cible Block parent
     */
    addOption(lstOpts,cible){
        let opt=null
        lstOpts.forEach(elt =>{
            opt=document.createElement("option")
            this.setattr(elt.attr,opt)
            this.addText(elt.text,opt)
            cible.appendChild(opt)
        })
    }

    addText(texte,cible){
        cible.appendChild(document.createTextNode(texte))
    }

    /**
     * Ajout d'eventListener ssur l'elt cilble
     * @param {[{evt:"event",fct:"function"}]} events 
     * @param {HTMLElement} cible 
     */
    addEvent(tab_events,cible){
        tab_events.forEach(elt=>{
            cible.addEventListener(elt.evt,elt.fct)
        })
    }
}