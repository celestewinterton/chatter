import React, { useState, useEffect } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { useSelector, useDispatch } from 'react-redux'
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";
import { io } from 'socket.io-client'


const DropdownMultipleCombobox = ({ edit, group }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const users = useSelector(state => state.users)
  const usernames = Object.values(users)?.map(user => user.username)
  const items = usernames
  const [members, setMembers] = useState((edit) ? group.members : '')
  const [inputValue, setInputValue] = useState('')
  const [errors, setErrors] = useState({});

  let socket;
  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors;
    const memberIds = Object.values(users).filter(user => selectedItems.includes(user.username)).map(user => user.id).join(", ")
    setMembers(memberIds)
    const formData = new FormData();
    formData.append('members', members)
    formData.append('owner_id', user.id)

    if (edit) {
      console.log('woof')
      dispatch(editGroupRoom(formData, group.id))
    }
    else errors = await dispatch(createGroupRoom(formData))

    if (errors) console.log(errors)
  }

  useEffect(() => {
    setErrors(errors)
  }, [errors]);

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({ initialSelectedItems: [] })
  const getFilteredItems = (items) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
    )

  const {
    isOpen,
    initialIsOpen,
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
    onStateChange: ({ inputValue, type, selectedItem }) => {
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


  return (
    <form autoComplete="off" className="group-create-container" onSubmit={handleSubmit}>
      <div className='group-create-input-container'>
        <div className='multiselect-container'>
          <label className='multiselect-label' {...getLabelProps()}>To: </label>
          {selectedItems.map((selectedItem, index) => (
            <span
              className='multiselected-user'
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
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
              style={
                highlightedIndex === index ? { backgroundColor: '#2bac76' } : {} //#2bac76
              }
              placeholder='@somebody'
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
          <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">Start DM</button>
          <button className='multiselect-dropdown' {...getToggleButtonProps()} aria-label={'toggle menu'}></button>
        </div>
        <ul {...getMenuProps()}>
          {true &&
            getFilteredItems(items).map((item, index) => (
              <li
                style={
                  highlightedIndex === index ? { backgroundColor: '#2bac76' } : {} //#2bac76
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </form>
  )
}

export default DropdownMultipleCombobox;
