class work {

    _figure

    constructor(src_img, title_img) {
        this._figure=this.creat_figure(src_img, title_img)
    }
    
    creat_figure (src_img, title_img) {
        const figure = document.createElement("figure")
        figure.appendChild(this.creat_img(src_img,title_img))
        figure.appendChild(this.creat_caption(title_img))
        return figure
    }

    creat_img (src_img, title_img) {
        const img=document.createElement("img")
        img.setAttribute("src",`${src_img}`)
        img.setAttribute("title",`${title_img}`)
        img.setAttribute("alt",`${title_img}`)
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
    
    show (){
    return this._figure
    }

}


class works extends work {
    _work
    constructor(work){
        super(work.imageUrl,work.title)
        this._work=work
    }
}