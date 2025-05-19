const btnDl = document.getElementById('toggleBtn');
const land = document.getElementById('lp1');
const hd = document.getElementById('hd1');
const t1 = document.getElementById('t1');
const tB = document.getElementById('toggleBtn');
const rlg = document.getElementById('ctRlg');
const st = document.getElementById('start');
const ps = document.getElementById('pausa');
const rt = document.getElementById('reset');
let reset = false;

let pausa = true;
let tempo = 25;
let pausaCurta = false;

btnDl.addEventListener('click', () => {
    let bgEstiloAtual = window.getComputedStyle(land).backgroundColor
    btnDl.classList.toggle('active');
    tB.style.pointerEvents = 'none'
    setTimeout(() => {
        tB.style.pointerEvents = 'all';
    }, 440);
    if (bgEstiloAtual == 'rgb(20, 20, 20)') {
        land.style.backgroundColor = 'white'
        hd.style.backgroundColor = 'white'
        t1.style.color = 'rgb(19, 16, 16)'
        document.body.style.backgroundColor = 'white'
        rlg.style.color = 'rgb(19, 16, 16)'

        st.style.backgroundColor = 'rgb(180, 153, 153)'
        ps.style.backgroundColor = 'rgb(180, 153, 153)'
        rt.style.backgroundColor = 'rgb(180, 153, 153)'
        document.getElementById('lbOpc').style.color = 'rgb(19, 16, 16)'

    } else {
        land.style.backgroundColor = 'rgb(20, 20, 20)'
        hd.style.backgroundColor = ''
        t1.style.color = 'white'
        document.body.style.backgroundColor = 'rgb(20, 20, 20)'
        rlg.style.color = 'white'
        st.style.backgroundColor = 'rgb(147, 255, 46)'
        ps.style.backgroundColor = 'rgb(147, 255, 46)'
        rt.style.backgroundColor = 'rgb(147, 255, 46)'
        document.getElementById('lbOpc').style.color = 'white'

    }
})

document.getElementById('start').addEventListener('click', () => {
    let duracao = tempo * 60;
    display = document.getElementById('ctRlg');
    st.style.pointerEvents = 'none';
    st.style.opacity = '0.4'
    pausa = false;
    pausaCurta = false;
    reset = false;
    cronometro(duracao, display);
    const soundPlay = new Audio('sound/start.mp3')
    soundPlay.play()
})

const cronometro = (duracao, display) => {
    let cronometro = duracao;
    let minutos, segundos;

    let intervalo = setInterval(() => {
        let sFim = new Audio('sound/fim.mp3')
        let cPass = new Audio('sound/clockPass.mp3')
        if (!reset) {
            if (!pausa) {
                if (!pausaCurta) {
                    minutos = Math.floor(cronometro / 60);
                    segundos = Math.floor(cronometro % 60);

                    minutos = minutos < 10 ? '0' + minutos : minutos;
                    segundos = segundos < 10 ? '0' + segundos : segundos;
                    display.innerHTML = `${minutos}:${segundos}`
                    cronometro -= 1;
                    if (cronometro > 1) {
                        cPass.play()
                    }

                    if (cronometro < 0) {
                        sFim.play()
                        pausa = true;
                        clearInterval(intervalo)
                        st.style.opacity = '1'
                        document.getElementById('start').style.pointerEvents = 'all'
                    }
                } else {
                    clearInterval(intervalo)
                    document.getElementById('start').style.pointerEvents = 'all'
                }
            }
        } else {
            clearInterval(intervalo);
            tempo = tempo == 5 ? 5 : 25;
            document.getElementById('start').style.pointerEvents = 'all'
            rlg.innerHTML = tempo != 5 ? `${tempo}:00` : '05:00'

        }
    }, 1000);
}

document.getElementById('pausa').addEventListener('click', () => {
    pausa = pausa == false ? true : false;
    const soundPause = new Audio('sound/pause.mp3')
    soundPause.play()
})

document.getElementById('reset').addEventListener('click', () => {
    reset = true;
    st.style.opacity = '1'
    if (lp1.style.backgroundColor == 'white') {
        st.style.backgroundColor = 'rgb(180, 153, 153)'
    } else {
        st.style.backgroundColor = 'rgb(147, 255, 46)'
    }
    rlg.innerHTML = tempo != 5 ? `${tempo}:00` : '05:00'
})

document.getElementById('opPausa').addEventListener('click', () => {
    pausaCurta = true;
    rlg.innerHTML = '05:00'
    tempo = 5
})
document.getElementById('foco').addEventListener('click', () => {
    pausaCurta = true;
    rlg.innerHTML = '25:00'
    tempo = 25
})



st.addEventListener('mouseover', () => {
    st.style.backgroundColor = 'rgba(37, 30, 30, 0.57)'
})

st.addEventListener('mouseout', () => {
    if (lp1.style.backgroundColor == 'white') {
        st.style.backgroundColor = 'rgb(180, 153, 153)'
    } else {
        st.style.backgroundColor = 'rgb(147, 255, 46)'
    }
})
ps.addEventListener('mouseover', () => {
    ps.style.backgroundColor = 'rgba(37, 30, 30, 0.57)'
})

ps.addEventListener('mouseout', () => {
    if (lp1.style.backgroundColor == 'white') {
        ps.style.backgroundColor = 'rgb(180, 153, 153)'
    } else {
        ps.style.backgroundColor = 'rgb(147, 255, 46)'
    }
})
rt.addEventListener('mouseover', () => {
    rt.style.backgroundColor = 'rgba(37, 30, 30, 0.57)'
})

rt.addEventListener('mouseout', () => {
    if (lp1.style.backgroundColor == 'white') {
        rt.style.backgroundColor = 'rgb(180, 153, 153)'
    } else {
        rt.style.backgroundColor = 'rgb(147, 255, 46)'
    }
})