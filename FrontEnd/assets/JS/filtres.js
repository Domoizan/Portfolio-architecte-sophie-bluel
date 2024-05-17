/**
 * création et afichage du block filtre depuis la des catégories
 * @private {HTMLDivElement} _blck block cible
 * @private {HTMLDivElement[]} _lstBt tableau des boutons de filtrage
 */

class filtres {
    _blck 
    _lstBt=[]
    /**
     * 
     * @param {HTMLDivElement} blck block cible
     * @param {string[]} lstCat tableau des categories
     */
    constructor(blck, lstCat) {
        this._blck=blck
        this.creatBt(lstCat)
    }
    
    creatBt(lstCat) {
        let bt, elt
        let ok = true
        for( elt of lstCat ){
            bt = document.createElement("div")
            if(ok){
                bt.setAttribute("class","filtre actif")
                ok=false
            }else{
                bt.setAttribute("class","filtre clickable")
                bt.addEventListener("click",appFiltre)
            } 
            bt.setAttribute("id",`filtre_${elt[0]}`)
            bt.setAttribute("data-value",elt[0])
            bt.innerHTML=elt[1]
            this._lstBt.push(bt)
        }
    }

    /**
     * Ajout des boutons dans le div cible
     */
    showFiltre() {
        let elt
        for(elt of this._lstBt){
            this._blck.appendChild(elt)
        }
    }

}