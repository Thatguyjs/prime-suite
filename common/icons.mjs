const icon_container = document.createElement('div');
icon_container.classList.add('hidden');

const icons_src = await (await fetch('../common/icons.svg')).text();
icon_container.innerHTML = icons_src;

document.body.appendChild(icon_container);
