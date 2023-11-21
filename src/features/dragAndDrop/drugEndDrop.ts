// https://htmlacademy.ru/blog/articles/drag-and-drop
//https://lpgenerator.ru/blog/2016/03/15/sozdaem-prostoj-html5-drag-drop-interfejs/
//https://gearmobile.github.io/javascript/javascript-drag-and-drop/
//https://habr.com/ru/post/187582/
//https://www.digitalocean.com/community/tutorials/js-drag-and-drop-vanilla-js-ru

export function drugStart(ev: any): void {
  ev.target.classList.add(`selected`)
}

export function drugEnd(ev: any, document: any, itemsCommonSelector: string): string[] {
  ev.target.classList.remove(`selected`)

  const newElements = document.querySelectorAll(itemsCommonSelector)
  let refreshedItemLine_id = []
  for (let el of newElements) {
    refreshedItemLine_id.push(el.getAttribute('id'))
  }
  return refreshedItemLine_id
}

export function dragOver(evt: any, tasksListElement: any, itemClassName: string): void {
  evt.preventDefault()

  const activeElement = tasksListElement.querySelector(`.selected`)
  const currentElement = evt.target
  const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains(itemClassName)

  if (!isMoveable)
    return

  // evt.clientY — вертикальная координата курсора в момент, когда сработало событие
  const nextElement = getNextElement(evt.clientY, currentElement)

  // Проверяем, нужно ли менять элементы местами
  if (
    nextElement &&
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  )  // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
    return

  tasksListElement.insertBefore(activeElement, nextElement)
}


const getNextElement = (cursorPosition: any, currentElement: any) => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим вертикальную координату центра текущего элемента
  const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

  // Если курсор выше центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement = (cursorPosition < currentElementCenter) ?
    currentElement :
    currentElement.nextElementSibling;

  return nextElement
}