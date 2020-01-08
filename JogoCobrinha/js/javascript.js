var pontoInicialTop = Math.floor(Math.random() * 25+1)*10,
pontoInicialLeft = Math.floor(Math.random() * 39+1)*10;
var numeroSlime=0;
var direcao = Math.floor(Math.random() * 4);
var fim=false;
var slimesMortos=0;
// BOTTOM TOP LEFT RIGHT
var velocidadeTempo = 120, velocidade = 10;
var posicaoTop = pontoInicialTop, posicaoLeft = pontoInicialLeft;
var animacao;
var maca;
var caminhoTop;
var caminhoLeft;
var pontuacao=0;
var flag=true;
var tipoOvo=0;
var comecar=false;
var grandeTamanho = 20;
var macas;
$(window).ready(iniciaJogo);

function inicio(){
    var slime = $("<img/>", {
        src: "assets/slimeVerde.png",
        class:"slime",
        id:"slime"+numeroSlime
    });
    $("#mapa").append(slime);
    
    while(pontoInicialTop<50 || pontoInicialTop> 200){
        pontoInicialTop = Math.floor(Math.random() * 25+1)*10;
    }
    while(pontoInicialLeft<100 || pontoInicialLeft> 350){
        pontoInicialLeft = Math.floor(Math.random() * 39+1)*10;
    }
    $("#slime"+numeroSlime).css("top", (pontoInicialTop)+"px");
    $("#slime"+numeroSlime).css("left", (pontoInicialLeft)+"px");
    adicionaSlime();
    macaAleatoria();
    
    $(document).keydown(function(e){
        if(e.which==37 || e.which==38 || e.which==39 || e.which==40){
            if(fim==false)
            direcaoSlime(e);
        }
    });
    animacao = setInterval(movimento, velocidadeTempo);
}

function iniciaJogo(){
    var telaInicial = $("<div></div>", {
        class:"inicio"
    });
    $("#mapa").append(telaInicial);
    $(".inicio").html("<h2>Pressione qualquer tecla para iniciar o jogo</h2>");
    $(document).keyup(function(e){
        if(comecar==false){
            $(".inicio").remove();
            comecar=true;
            inicio();
            direcaoSlime(e);
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function acabaJogo(tipo){
    if(fim==false){
        fim=true;
        var telaFinal = $("<div></div>", {
            class:"final"
        });
        var i=0;
        if(tipo==2){
            var slimeGrande = $("<img/>", {
                src: "assets/slimeGrande.png",
                class:"slimeGrande"
            });
            $("#mapa").append(slimeGrande);
            $(".slimeGrande").css("top", ($("#slime0").position().top));
            $(".slimeGrande").css("left", ($("#slime0").position().left));
            caminhoLeft = $(".slimeGrande").position().left;
            $("#slime0").remove();
            i=numeroSlime;
            while(i>=1){
                $("#slime"+i).remove();
                grandeTamanho += 4;
                $(".slimeGrande").css("width", (grandeTamanho+"px"));
                if(i>=1){
                    i--;
                }
                await sleep(200);
            }
        } else {
            var x = setInterval(() => {
                $("#slime"+i).attr("src", "assets/slime.png");
                if(i<=numeroSlime){
                    i++;
                }
            }, 100);
            await sleep(100*numeroSlime+300);
            clearInterval(x);
        }
        if(i>numeroSlime || i<=1){
            await sleep(800);
            $("#mapa").append(telaFinal);
            if(tipo==0){
                $(".final").html("<h3>Você Perdeu! Bateu em uma parede.<br>Aperte qualquer tecla para reiniciar</h3>");
            }
            if(tipo==1){
                $(".final").html("<h3>Você Perdeu! Esbarrou em outro Slime.<br>Aperte qualquer tecla para reiniciar</h3>");
            }
            if(tipo==2){
                $(".final").html("<h3>Você Perdeu! Formou um super Slime.<br>Aperte qualquer tecla para reiniciar</h3>");
            }
            $(document).keyup(function(e){
                location.reload();
            });
        }
    }
}

function macaAleatoria(){
    $("#mapa").append(ovoAleatorio());
    $(".maca").css("top", (Math.floor(Math.random() * 23+1)*10)+"px");
    $(".maca").css("left", (Math.floor(Math.random() * 38+1)*10)+"px");
}

function ovoAleatorio(){
    var ovoRandom = Math.floor(Math.random() * 4);
    if(ovoRandom==0){
        var maca = $("<img/>", {
            src: "assets/ovos/ovoVerde.png",
            class:"maca"
        });
        tipoOvo=ovoRandom;
        return maca;
    }
    if(ovoRandom==1){
        var maca = $("<img/>", {
            src: "assets/ovos/ovoAzul.png",
            class:"maca"
        });
        tipoOvo=ovoRandom;
        return maca;
    }
    if(ovoRandom==2){
        var maca = $("<img/>", {
            src: "assets/ovos/ovoVermelho.png",
            class:"maca"
        });
        tipoOvo=ovoRandom;
        return maca;
    }
    if(ovoRandom==3){
        var maca = $("<img/>", {
            src: "assets/ovos/ovoRoxo.png",
            class:"maca"
        });
        tipoOvo=ovoRandom;
        return maca;
    }
}

function movimento(){
    movimentoAutomatico();
}

function movimentoAutomatico(){
    if(direcao==0){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("top", ($("#slime0").position().top+velocidade)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==1){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("top", ($("#slime0").position().top-velocidade)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==2){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("left", ($("#slime0").position().left+velocidade)+"px");
        checaParede();
        checaMaca();
        movimentaSlimes();
        checaCobra();
    }
    if(direcao==3){
        caminhoTop= $("#slime0").position().top;
        caminhoLeft= $("#slime0").position().left;
        $("#slime0").css("left", ($("#slime0").position().left-velocidade)+"px");
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
            $("#slime0").css("z-index", "111");
            clearInterval(animacao);
            acabaJogo(1);
        }
    }
}

function checaParede(){
    if($("#slime0").position().top<0){
        clearInterval(animacao);
        acabaJogo(0);
    }
    if($("#slime0").position().top>240){
        clearInterval(animacao);
        acabaJogo(0);
    }
    if($("#slime0").position().left<0){
        clearInterval(animacao);
        acabaJogo(0);
    }
    if($("#slime0").position().left>380){
        clearInterval(animacao);
        acabaJogo(0);
    }
}

function checaMaca(){
    //((($(".maca").position().top-10)<=($("#slime0").position().top)<=($(".maca").position().top+10)
    //&&($(".maca").position().left-10)<=($("#slime0").position().left)<=($(".maca").position().left+10)))

    if((($("#slime0").position().top)==($(".maca").position().top)) &&
    (($("#slime0").position().left)==($(".maca").position().left)) ||
    (($("#slime0").position().top)==($(".maca").position().top-10)) &&
    (($("#slime0").position().left)==($(".maca").position().left)) ||
    (($("#slime0").position().top)==($(".maca").position().top+10)) &&
    (($("#slime0").position().left)==($(".maca").position().left)) ||
    (($("#slime0").position().top)==($(".maca").position().top)) &&
    (($("#slime0").position().left)==($(".maca").position().left-10)) ||
    (($("#slime0").position().top)==($(".maca").position().top)) &&
    (($("#slime0").position().left)==($(".maca").position().left+10))){
        $(".maca").remove();
        adicionaSlime();
        macaAleatoria();
        pontuacao += 1;
        $("#pontuacao").html("Pontuação: " + pontuacao );
        if(pontuacao%5==0 && velocidadeTempo>50){
            velocidadeTempo -= 10;
            clearInterval(animacao);
            animacao = setInterval(movimento, velocidadeTempo);
            console.log(velocidadeTempo);
        }
    }
}

function slimeAleatorio(){
    if(tipoOvo==0){
        var slime1 = Math.floor(Math.random() * 3);
        if(slime1==1||slime1==0){
            var slime = $("<img/>", {
                src: "assets/slimeVerde.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
        if(slime1==2){
            var slime = $("<img/>", {
                src: "assets/slimeAmarelo.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
    }
    if(tipoOvo==1){
        var slime2 = Math.floor(Math.random() * 3);
        if(slime2==1||slime2==0){
            var slime = $("<img/>", {
                src: "assets/slimeAzul.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
        if(slime2==2){
            var slime = $("<img/>", {
                src: "assets/slimeAmarelo.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
    }
    if(tipoOvo==2){
        var slime3 = Math.floor(Math.random() * 3);
        if(slime3==1||slime3==0){
            var slime = $("<img/>", {
                src: "assets/slimeVermelho.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
        if(slime3==2){
            var slime = $("<img/>", {
                src: "assets/slimePreto.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
    }
    if(tipoOvo==3){
        var slime4 = Math.floor(Math.random() * 4);
        if(slime4==1||slime4==0){
            var slime = $("<img/>", {
                src: "assets/slimeRoxo.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
        if(slime4==2){
            var slime = $("<img/>", {
                src: "assets/slimeCinza.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
        if(slime4==3){
            var slime = $("<img/>", {
                src: "assets/slimeMarrom.png",
                class:"slime",
                id:"slime"+numeroSlime
            });
            return slime;
        }
    }
}

function adicionaSlime(){
    numeroSlime += 1;
    $("#mapa").append(slimeAleatorio());
    if(direcao==0){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top-20)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().top-20==$("#slime"+(i)).position().top){
                $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top+20)+"px");
            }
        }
    }
    if(direcao==1){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top+20)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().top+20==$("#slime"+(i)).position().top){
                $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top-20)+"px");
            }
        }
    }
    if(direcao==2){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left-20)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().left-20==$("#slime"+(i)).position().left){
                $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left+20)+"px");
            }
        }
    }
    if(direcao==3){
        $("#slime"+numeroSlime).css("top", ($("#slime"+(numeroSlime-1)).position().top)+"px");
        $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left+20)+"px");
        for(var i=0; i<numeroSlime; i++){
            if($("#slime"+(numeroSlime-1)).position().left+20==$("#slime"+(i)).position().left){
                $("#slime"+numeroSlime).css("left", ($("#slime"+(numeroSlime-1)).position().left-20)+"px");
            }
        }
    }
}

function direcaoSlime(e){
    if(e.wich == 40 || e.keyCode == 40){
        if(direcao!=1){
            direcao=0;
            movimento();
        }
        if(direcao==1 && pontuacao>2){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
            acabaJogo(2);
        }
    }
    if(e.wich == 38 || e.keyCode == 38){
        if(direcao!=0){
            direcao=1;
            movimento();
        }
        if(direcao==0 && pontuacao>2){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
            acabaJogo(2);
        }
        
    }
	if(e.wich == 39 || e.keyCode == 39){
        if(direcao!=3){
            direcao=2;
            movimento();
            
        }
        if(direcao==3 && pontuacao>2){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
            acabaJogo(2);
        }
	}
    if(e.wich == 37 || e.keyCode == 37){
        if(direcao!=2){
            direcao=3;
            movimento();
        }
        if(direcao==2 && pontuacao>2){
            $("#mapa").css("border-color", "red");
            clearInterval(animacao);
            acabaJogo(2);
        }
    }
}