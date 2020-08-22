import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log('UPDATE SUCCESSFUL:', res.data);
        updateColors([
          ...colors.filter(color => color.id !== colorToEdit.id), res.data
        ])
      })
      .catch(err => console.log('FAILED TO UPDATE:', err))
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        console.log('DELETE SUCCESSFUL:', 'Deleted color with id: ' + res.data)
        updateColors([
          ...colors.filter(color => color.id !== res.data)
        ])
      })
      .catch()
    // make a delete request to delete this color
  };

  const addColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', colorToAdd)
      .then(res => {
        console.log('ADD SUCCESSFULL:', res.data);
        updateColors(res.data);
        setColorToAdd(initialColor);
      })
      .catch(err => console.log('FAILED to add color:', err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>      
      <p>select a color to edit</p>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            placeholder='color'
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
            <input
            placeholder='#000000'
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className='button-row' >
          <button type='submit'>add</button>
        </div>
      </form>

      <div className="spacer" />
    </div>
  );
};

export default ColorList;
