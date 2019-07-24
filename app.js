import _ from 'lodash';

const fetchData = () => {
    return fetch('http://localhost:4000/data')
        .then((res) => { 
            return res.json();            
        })
        .catch((error)=> {
            console.log(error);
        })
};

fetchData().then((data)=> {
    getTags(data);

    createCardList(data);
});

const getTags = (arr) => {
    let tagArr = []
    arr.forEach((obj, i)=> {
        obj.tags.forEach((tag) => {
            tagArr.push(tag)
        })
    })
    let tagHtml = document.getElementById('tags');
    new Set(tagArr).forEach((tag)=> {
        let el = document.createElement('option');
        el.textContent = tag;
        el.value = tag;
        tagHtml.appendChild(el);
    });
}

document.getElementById('tags').onchange = ()=> {
    let value = document.getElementById('tags').value;
    fetchData().then(data => {
        let newData = []
        _.filter(data, (o)=> {
            if( _.includes(o.tags, value)) {
                newData.push(o);
            }
        });
        createCardList(newData);
    }) 
}

document.getElementById('sorting').onchange = ()=> {
    let value = document.getElementById('sorting').value;
    fetchData().then(data => {
        let newRes = _.sortBy(data, value);
        createCardList(newRes);
    }) 
}

const createCardList = (objArr) => {
    if(document.getElementById('list-restaurents').childNodes.length > 0) {
        let checkDiv = document.getElementById('list-restaurents');
        while ( checkDiv.firstChild ) checkDiv.removeChild( checkDiv.firstChild );
    }

    objArr.forEach((singleObj) => {
        document.getElementById('list-restaurents').appendChild(createCard(singleObj));
    })
}




const createCard = (obj)=> {
    
    let div = document.createElement('div');
    div.setAttribute('id', 'rest-card');

    let name = createNameHTML(obj.name);
    let desc = createSpanHTML(obj.description);
    
    let subdiv1 = document.createElement('div');
   
    let eta = createSpanHTML(`ETA: ${obj.ETA}` );
    let location = createSpanHTML(`Location: ${obj.location}`);
   
    subdiv1.appendChild(eta);
    subdiv1.appendChild(location);

    let subdiv2 = document.createElement('div');
    
    let rating = createSpanHTML(`Rating: ${obj.rating}`);
    let priceTwo = createSpanHTML(`For Two: ${obj.price_two}`);

    let tagsDiv = document.createElement('div');
    tagsDiv.setAttribute('id', 'tags');
    obj.tags.forEach((tag)=> {
        tagsDiv.appendChild(createSpanHTML(tag));
    })
    

    subdiv2.appendChild(rating);
    subdiv2.appendChild(priceTwo);

    div.appendChild(name);
    div.appendChild(desc);
    div.appendChild(subdiv1);
    div.appendChild(subdiv2);
    div.appendChild(tagsDiv);
    return div;

};



const createNameHTML = (val) => {
    let nameHTML = document.createElement('h3');
    nameHTML.innerText = val;
    return nameHTML;
} 

const createSpanHTML = (val) => {
    let spanHTML = document.createElement('span');
    spanHTML.innerHTML = val;
    return spanHTML;
}

