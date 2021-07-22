document.querySelector('.busca').addEventListener('submit',async (event)=>{ //funçao async informa para o JS que iremos usar codicos asincronos ou seja codigos nao ordenados 
    event.preventDefault();              //previne o comportamento padrao , evita de o dormulario ser enviado , caso o formulario e enviado a pagina atualiza e perdemos o processo atual
   
    let input = document.querySelector('#searchInput').value;          //

    console.log(input);     // oque for digitado sera armazenado na variavel
    if(input != ''){
        clearInfor();
        showWarning('Carregando...');

        //let url = 'api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}' ; //basta inserir o nome em city name 
        let url = ` http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=8a19508c1203e0b0c4da5322e614d44a&units=metric&lang=pt_br` ; // vai linkar com o site e fazer uma requesição de acordo com o que pesquisarmos
        let results = await fetch(url);         //fetch essa função trabalha como se fosse uma promeça , faz um requesição espera a resposta e so depois que cotinua o codigo /
        let json = await results.json();        // await informa o fecth fazer a requisição e aguardar o resultado / essa linha esta pegando o resultado da pesquisa e tranformando em Json

       if (json.cod == 200){
           
            showInfo({
                name:       json.name,
                country:    json.sys.country,
                temp:       json.main.temp,
                tempIcon:   json.weather[0].icon,
                windSpped:  json.wind.speed,
                windAngle : json.wind.deg
            });
       }else{
           clearInfor();
           showWarning('Nao encontramos esta localização');
       }
    }else{
        clearInfor();
    }
});

function showInfo(json){
    showWarning('');
    document.querySelector('.resultado').style.display = 'block'; // exibe a div com os resultado da pesquisa

    document.querySelector('.titulo').innerHTML=`${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML=`${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML=`${json.windSpped}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle}deg)`;


}

function clearInfor(){
    showWarning('');
    document.querySelector('.resultado').style.display='none';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;

}