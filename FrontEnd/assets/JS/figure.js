/**
 * Creation des fiches travaux pour le portefolio ou la galerie modale
 * selon le mode indiqué en argument :
 *  portfolio => affichage par default
 *  edit => affichage pour la modales permet l'edition et la sepression
 */
class work_card {

    _workCard
 
    /**
     * 
     * @param {{id: number, title: string, imageUrl: string, categoryId: number, userId: number, category: {id: number,name: string}}} work fiche d'un projet
     * @param {string} mode 
     */
    constructor(work, mode="portfolio") {
        this._workCard=this.creat_figure(work,mode)
    }
    /**
     * 
     * @param {{id: number, title: string, imageUrl: string, categoryId: number, userId: number, category: {id: number,name: string}}} work fiche d'un projet
     * @param {string} mode mode d'affichage default "portfolio"
     * @param event [{tag:"i",evts:[{evt:{name:"click",fct:"delWork"}}]}] i => event sur delIcone corbeille : img event sur photo 
     */
    creat_figure (work, mode="portfolio",event=[{tag:"i",evts:[{name:"click",fct:DelProjet}]}]) {

        if(mode==="portfolio"){
            return this.creat_figure_portfolio(work)}
        else{
            return this.creat_figure_edit(work,event)
        }
    }

    creat_figure_portfolio(work){
        const figure = document.createElement("figure")
        figure.setAttribute("id",`pf_${work.id}`)
        figure.appendChild(this.creat_img(work))
        figure.appendChild(this.creat_caption(work.title))
        return figure
    }

    creat_figure_edit(work,event){
        const figure = document.createElement("figure")
        figure.setAttribute("id",`ed_${work.id}`)
        figure.appendChild(this.creat_img(work))
        figure.appendChild(this.creat_DelIcon(work,event))
        return figure
    }
    
    //index = fruits.findIndex((fruit) => fruit === "fraise");
    creat_DelIcon (work, event){
        const i = document.createElement("i")
        const index=event.findIndex((elt) => elt.tag==="i")
        i.setAttribute("id",`ico_${work.id}`)
        i.setAttribute("class","fa-solid fa-trash-can clickable")
        i.setAttribute("data-value",`${work.id}`)
        if( index >= 0 ) event[index].evts.forEach(element => {
            i.addEventListener(element.name,element.fct)
        });
        return i
    }

    creat_img (work) {
        const img=document.createElement("img")
        img.setAttribute("id",`img_${work.id}`)
        img.setAttribute("src",`${work.imageUrl}`)
        img.setAttribute("title",`${work.title}`)
        img.setAttribute("alt",`${work.title}`)
        img.setAttribute("data-value",`${work.id}`)
        return img
    }

    creat_text (txt) {
        const text=document.createTextNode(txt)
        return text
    }

    creat_caption (txt) {
        const cap=document.createElement("figcaption")
        cap.appendChild(this.creat_text(txt))
        return cap
    }


    
    show (galerie){
        galerie.appendChild(this._workCard)
    }
}
