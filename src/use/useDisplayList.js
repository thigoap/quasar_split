export function useDisplayList(displayList) {
  if (displayList) {
    console.log('useDisplayList', displayList)
    const liststring = displayList.join(', ')
    console.log('useList: ', liststring)
    return liststring
  }
}