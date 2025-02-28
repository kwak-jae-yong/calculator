document.addEventListener('DOMContentLoaded', function () {
    //1.계산기 화면(디스플레이)와 버튼 목록 가져오기
    const screen = document.querySelector('#display')
    const btns = document.querySelectorAll('#buttons button')

    let expression = ''
    //expression = btn.textContent
    //screen.value = expression

    btns.forEach(btn => {
        btn.addEventListener('click', () => handleInput(btn.textContent))
    })


    function handleInput(val) {

       const lastChar = expression.slice(-1)
        //console.log('숫자입니다')
        if (isNumberOrDot(val)) {
            appendToExpression(val)

        } else if (isOperator(val)) {
         
            if (!isOperator(lastChar)) appendToExpression(val)
        } else if (val === 'C') {
            clearExpression()
        }else if (val === '='){
            calculateResult()
        }
    }

    function isNumberOrDot(val) {
        return !isNaN(val) || val === '.'

    }
    function isOperator(val) {
        return "+-*/".includes(val)

    }

    function appendToExpression(val) {
        expression += val
        screen.value = expression
    }

    function clearExpression() {
        expression = ''
        screen.value = '0'
    }

    function calculateResult() {
        try {
            const result = eval(expression)
            if (isFinite(result)) {
                expression = String(result)
                screen.value = expression
            } else {
                throw new Error('계산 오류입니다')
            }
        } catch {
            clearExpression()
            screen.value = 'Error'
        }

    }

})