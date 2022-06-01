import React, { useState, useEffect } from 'react'
import { useCombobox, useMultipleSelection } from 'downshift'
import { useSelector, useDispatch } from 'react-redux'
import { createGroupRoom, editGroupRoom } from "../../../store/chatRooms";


const DropdownMultipleCombobox = ({ setShowModal, edit, group }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const users = useSelector(state => state.users)
  const usernames = Object.values(users)?.map(user => user.username)
  const items = usernames
  const [members, setMembers] = useState((edit) ? group.members : [])
  const [inputValue, setInputValue] = useState('')
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault()
    let errors;
    const memberIds = Object.values(users).filter(user => members.includes(user.username)).map(user => user.id).join(", ")
    const formData = new FormData();
    formData.append('members', memberIds)
    formData.append('owner_id', user.id)

    if (edit) dispatch(editGroupRoom(formData, group.id))
    else errors = await dispatch(createGroupRoom(formData))

    if (errors) console.log(errors)

    // setShowModal(false);
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
                onMouseDown={(e) => setMembers(members.filter((member) => member !== selectedItem))}
              >
                &#10005;
              </span>
            </span>
          ))}
          <div {...getComboboxProps()}>
            <input
              className='multiselect-input'
              placeholder='@somebody'
              {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            />
          </div>
          <button disabled={Object.keys(errors).length > 0} id='create-group' type="submit">Start DM</button>
          <button className='multiselect-dropdown' {...getToggleButtonProps()} aria-label={'toggle menu'}></button>
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            getFilteredItems(items).map((item, index) => (
              <li
                style={
                  highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                onMouseDown={(e) => setMembers(members => [...members, item])}
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
