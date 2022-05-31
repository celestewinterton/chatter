import React, {useState} from 'react'
import {render} from 'react-dom'
import {useCombobox, useMultipleSelection} from 'downshift'
import { useSelector } from 'react-redux'


const DropdownMultipleCombobox = ({members, setMembers}) => {
  const users = useSelector(state => state.users)
  const usersArr = Object.values(users)
  const usernames = Object.values(users)?.map(user => user.username)
  const items = usernames
  const [inputValue, setInputValue] = useState('')


  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({initialSelectedItems: [items[0], items[1]]})
  const getFilteredItems = (items) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
    )

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({inputValue, type, selectedItem}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem)
            selectItem(null)
          }

          break
        default:
          break
      }
    },
  })

  console.log("From Downshift..... ", usernames)

  return (
    <div>
      <div className='multiselect-container'>
        <label className='multiselect-label' {...getLabelProps()}>To: </label>
        {selectedItems.map((selectedItem, index) => (
          <span
            className='multiselected-user'
            key={`selected-item-${index}`}
            {...getSelectedItemProps({selectedItem, index})}
          >
            {selectedItem}
            <span
              onClick={() => removeSelectedItem(selectedItem)}
            >
              &#10005;
            </span>
          </span>
        ))}
        <div {...getComboboxProps()}>
          <input
            className='multiselect-input'
            placeholder='@somebody'
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
          />
        </div>
        <button className='multiselect-dropdown' {...getToggleButtonProps()} aria-label={'toggle menu'}></button>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DropdownMultipleCombobox;
