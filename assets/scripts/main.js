



// burger
{
    const nav = document.querySelector('.nav');
    const container = document.querySelector('.nav ._container');
    document.querySelector('.nav__control-burger').addEventListener('click', () => {

        container.style.opacity = 0;
        setTimeout( () => {
            container.style.opacity = 1;
        }, 300);
        setTimeout( () => {
            nav.classList.toggle('active');
            document.body.classList.toggle('block');
        }, 300)
    });
}


// ip copy
{
    const item = document.querySelector('.nav__control-online');
    const itemHover = document.querySelector('.nav__control-online__hover');
    const ip = document.querySelector('.nav__control-online__ip').textContent;

    item.addEventListener('click', () => {
        navigator.clipboard.writeText(ip)
            .then(() => {
                console.log(` [!] Айпи ${ip} успешно скопирован!`)
                itemHover.innerHTML = 'IP серверу скопійовано!';
                itemHover.style.backgroundColor = "#4cb58f";

                setTimeout(() => {
                    itemHover.innerHTML = 'Натисніть, щоб скоюпіювати id серверу';
                    itemHover.style.backgroundColor = "#000";
                }, 10000);
            }).catch(err => {
            console.log(` [x] Помилка при копіюванні IP ${ip}. `, err);
            itemHover.innerHTML = 'Сталась помилка :(';
            itemHover.style.backgroundColor = "#b54c4c";

            setTimeout(() => {
                itemHover.innerHTML = 'Натисніть, щоб скоюпіювати id серверу';
                itemHover.style.backgroundColor = "#000";
            }, 10000);
        });
    });
}

//categories
{
    const controlItems = document.querySelectorAll('[category-control]');
    const productItems = document.querySelectorAll('[category-products]');

    for(const controlItem of controlItems) {
        controlItem.addEventListener('click', () => {
            if(controlItem.classList.contains('active')) return;
            const category = controlItem.getAttribute('category-control');
            const categoryElem = document.querySelector(`[category-products=${category}]`);
            clearActives();

            categoryElem.classList.add('active');
            controlItem.classList.add('active');
            window.scroll({top: (document.querySelector('.donate__box').offsetTop - document.querySelector('.nav').clientHeight), left: 0, behavior: 'smooth' });
        });
    }

    function clearActives() {
        for(const controlItem of controlItems) {
            controlItem.classList.remove('active');
        }
        for(const productItem of productItems) {
            productItem.classList.remove('active');
        }
    }
}

//footer up
{
    document.querySelector('.footer__up').addEventListener('click', () => {
        window.scroll({top: 0, left: 0, behavior: 'smooth' });
    })
}

//modals
{
    const closeItems = document.querySelectorAll('[modal-close]');
    const modalItems = document.querySelectorAll('[modal-item]')
    const modalBox = document.querySelector('[modal-box]');
    const modalButtons = document.querySelectorAll('[modal-open]');
    const body = document.querySelector('body');
    const modalProducts = document.querySelectorAll('[product-id]');

    closeItems.forEach((closeItem) => {
        closeItem.addEventListener('click', clearActives)
    });

    modalButtons.forEach((modalButton) => {
        modalButton.addEventListener('click', () => {
            const modalName = modalButton.getAttribute('modal-open');
            let modalItem;

            modalItems.forEach( (modalItemR) => {
                if(modalItemR.getAttribute('modal-item') == modalName) {
                    modalItem = modalItemR;
                }
            });

            modalItem.classList.add('active')
            modalBox.classList.add('active')
            body.classList.add('block')
        })
    });

    modalProducts.forEach((modalProduct) => {
        modalProduct.addEventListener('click', (e) => {
            if(!e.target.hasAttribute('modal-product')) return;
            const type = e.target.getAttribute('modal-product');

            if(type == 'description') {
                const description = modalProduct.getElementsByClassName('donate__products-description')[0].textContent;
                let modalItem;

                modalItems.forEach( (modalItemR) => {
                    if(modalItemR.getAttribute('modal-item') == 'description') {
                        modalItem = modalItemR;
                    }
                });

                const descriptionItem = modalItem.getElementsByClassName('modals__text')[0];
                descriptionItem.textContent = description;

                modalItem.classList.add('active')
                modalBox.classList.add('active')
                body.classList.add('block')
            } else if(type == 'buy') {
                const imageURL = modalProduct.getElementsByClassName('donate__products-image')[0].getElementsByTagName('img')[0].getAttribute('src');
                const name = modalProduct.getElementsByClassName('donate__products-name')[0].textContent;
                const price = modalProduct.getElementsByClassName('donate__products-price')[0].textContent;
                const id = modalProduct.getAttribute('product-id');
                const category = modalProduct.parentNode.getAttribute('category-products');
                const isBlockAmount = modalProduct.hasAttribute('block-amount');
                let modalItem;

                modalItems.forEach( (modalItemR) => {
                    if(modalItemR.getAttribute('modal-item') == 'buy') {
                        modalItem = modalItemR;
                    }
                });

                const imageItem = modalItem.getElementsByClassName('modals__product-image')[0].getElementsByTagName('img')[0];
                const nameItem = modalItem.getElementsByClassName('modals__product-name')[0];
                const priceItem = modalItem.getElementsByClassName('modals__product-price')[0];
                const inputItem = modalItem.getElementsByClassName('modals__input')[0];
                const amountItem = modalItem.getElementsByClassName('modals__amount')[0];
                const amountResultItem = modalItem.getElementsByClassName('modals__amount-result')[0];
                imageItem.setAttribute('src', imageURL);
                nameItem.textContent = name;
                priceItem.textContent = price;
                inputItem.setAttribute('product-category', category);
                inputItem.setAttribute('product-id', id);
                amountItem.setAttribute('block', isBlockAmount);
                amountResultItem.textContent = 1;

                if(isBlockAmount) {
                    amountItem.classList.add('disabled');
                } else {
                    amountItem.classList.remove('disabled');
                }

                modalItem.classList.add('active')
                modalBox.classList.add('active')
                body.classList.add('block')
            }
        })
    });

    modalBox.addEventListener('click', (e) => {
        if(e.target != modalBox) return;
        clearActives();
    });

    function clearActives() {
        modalItems.forEach( (modalItem) => {
            modalItem.classList.remove('active');
        })
        modalBox.classList.remove('active');
        body.classList.remove('block')
    }
}

// amount and select for modal buy
{
    const amountResult = document.querySelector('.modals__amount-result');
    const amountControl = document.querySelector('.modals__amount-control');

    amountControl.addEventListener('click', (e) => {
        let amount = amountResult.textContent;
        if(e.target.classList.contains('modals__amount-minus')) {
            if(amount <= 1) {
                amountResult.textContent = 1;
            } else {
                amountResult.textContent = --amount;
            }
        } else if(e.target.classList.contains('modals__amount-plus')) {
            amountResult.textContent = ++amount;
        }
    })

    const paymentButton = document.querySelector('.modals__payment-control');
    const paymentList = document.querySelector('.modals__payment-list');
    const paymentItems = document.querySelectorAll('.modals__payment-item');
    const paymentSelected = document.querySelector('.modals__payment-selected');

    paymentButton.addEventListener('click', () => {
        paymentList.classList.toggle('active');
    });

    paymentItems.forEach( (paymentItem) => {
        paymentItem.addEventListener('click', () => {
            const paymentName = paymentItem.textContent;

            paymentSelected.textContent = paymentName;
            paymentList.classList.remove('active');
        })
    });
}


