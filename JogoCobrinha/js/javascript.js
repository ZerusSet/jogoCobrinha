var pontoInicialTop = Math.floor(Math.random() * 59+1)*10,
pontoInicialLeft = Math.floor(Math.random() * 59+1)*10;
var numeroSlime=0;
var direcao = Math.floor(Math.random() * 4);
// BOTTOM TOP LEFT RIGHT
var distanciaMovimento = 10;
var posicaoTop = pontoInicialTop, posicaoLeft = pontoInicialLeft;
var animacao;
var maca;
var caminhoTop;
var caminhoLeft;
var pontuacao=0;
$(window).ready(inicio);

function inicio(){
    var slime = $("<div></div>", {
        class:"slime",
        id:"slime"+numeroSlime
    });
    $("#mapa").append(slime);
    $("#slime"+numeroSlime).css("top", (pontoInicialTop)+"px");
    $("#slime"+numeroSlime).css("left", (pontoInicialLeft)+"px");
    setTimeout(function(){
        animacao = setInterval(movimento, 100);
        macaAleatoria();
        $(document).keyup(function(e){
            direcaoSlime(e);
        });
    }, 1000);
    
}

function macaAleatoria(){
    var maca = $("<div></div>", {
        class:"maca"
    });
    $("#mapa").append(maca);
    $(".maca").css("top", (Math.floor(Math.random() * 58+1)*10)+"px");
    $(".maca").css("left", (Math.floor(Math.random() * 58+1)*10)+"px");
}

function movimento(){
    movimentoAutomatico();
}

function movimentoAutomatico(){
    if(direcao==0){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("top", ($("#slime0").position().top+10)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==1){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("top", ($("#slime0").position().top-10)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==2){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("left", ($("#slime0").position().left+10)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==3){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("left", ($("#slime0").position().left-10)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
}

function movimentaSlimes(){
    for(var i=1; i<=numeroSlime; i++){
        var caminhoAuxTop = $("#slime"+i).position().top, caminhoAuxLeft = $("#slime"+i).position().left;
        $("#slime"+i).css("top", (caminhoTop)+"px");
        caminhoTop = caminhoAuxTop;
        $("#slime"+i).css("left", (caminhoLeft)+"px");
        caminhoLeft = caminhoAuxLeft;
    }
}

function checaCobra(){
    for(var i=1; i<numeroSlime; i++){
        if($("#slime0").position().top == $("#slime"+i).position().top 
        && $("#slime0").position().left == $("#slime"+i).position().left){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
        }
    }
}

function checaParede(){
    if($("#slime0").position().top<0){
        $("#mapa").css("border-color", "red");
        clearInterval(animacao);
    }
    if($("#slime0").position().top==600){
        $("#mapa").css("border-color", "red");
        clearInterval(animacao);
    }
    if($("#slime0").position().left<0){
        $("#mapa").css("border-color", "red");
        clearInterval(animacao);
    }
    if($("#slime0").position().left==600){
        $("#mapa").css("border-color", "red");
        clearInterval(animacao);
    }
}

function checaMaca(){
    if((($("#slime0").position().top)==($(".maca").position().top)) && 
    (($("#slime0").position().left)==($(".maca").position().left))){
        $(".maca").remove();
        macaAleatoria();
        pontuacao += 1;
        $("#pontuacao").html("<h2>Pontuação: " + pontuacao + "</h2>");
        adicionaSlime();
    }
}

function adicionaSlime(){
    numeroSlime += 1;
    var slime = $("<div></div>", {
        class:"slime",
        id:"slime"+numeroSlime
    });
    console.log(numeroSlime);
    $("#mapa").append(slime);
    if(direcao==0){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top-10)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().top-10==$("#slime"+(i)).position().top){
                $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top+10)+"px");
            }
        }
    }
    if(direcao==1){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top+10)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().top+10==$("#slime"+(i)).position().top){
                $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top-10)+"px");
            }
        }
    }
    if(direcao==2){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left-10)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().left-10==$("#slime"+(i)).position().left){
                $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left+10)+"px");
            }
        }
    }
    if(direcao==3){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left+10)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().left+10==$("#slime"+(i)).position().left){
                $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left-10)+"px");
            }
        }
    }

    /*
    $("#slime"+numeroSlime).css("top", (pontoInicialTop)+"px");
    $("#slime"+numeroSlime).css("left", (pontoInicialLeft)+"px");
    */
}

function direcaoSlime(e){
    if(e.wich == 40 || e.keyCode == 40){
        if(direcao!=1){
            direcao=0;
        /*}else if(direcao==1 && pontuacao>2){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
        }*/
        }
    }
    if(e.wich == 38 || e.keyCode == 38){
        if(direcao!=0){
            direcao=1;
        }
        
    }
	if(e.wich == 39 || e.keyCode == 39){
        if(direcao!=3){
        direcao=2;}
        
	}
    if(e.wich == 37 || e.keyCode == 37){
        if(direcao!=2){
        direcao=3;}
        
    }
}