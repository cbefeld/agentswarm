import React, { useState } from 'react'
import '../styles/CharacterCard.css'

const CharacterCard = ({ character, index, onRemove, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEdit = (field, value) => {
    onUpdate(field, value)
  }

  const getClassColor = (characterClass) => {
    const colors = {
      'Wizard': '#4a90e2',
      'Fighter': '#e74c3c',
      'Ranger': '#27ae60',
      'Rogue': '#9b59b6',
      'Cleric': '#f39c12',
      'Paladin': '#e67e22',
      'Bard': '#e91e63',
      'Druid': '#8bc34a',
      'Monk': '#ff9800',
      'Sorcerer': '#673ab7',
      'Warlock': '#3f51b5',
      'Barbarian': '#d32f2f'
    }
    return colors[characterClass] || '#666'
  }

  return (
    <div 
      className="character-card"
      style={{ 
        '--card-color': getClassColor(character.class),
        '--card-index': index 
      }}
    >
      <div className="card-header">
        <div className="card-title">
          <input
            type="text"
            value={character.name}
            onChange={(e) => handleEdit('name', e.target.value)}
            className="editable-field card-name"
          />
        </div>
        <div className="card-type">
          <input
            type="text"
            value={character.class}
            onChange={(e) => handleEdit('class', e.target.value)}
            className="editable-field card-class"
          />
          <span className="card-level">
            <input
              type="number"
              value={character.level}
              onChange={(e) => handleEdit('level', parseInt(e.target.value) || 1)}
              className="editable-field level-input"
              min="1"
              max="20"
            />
          </span>
        </div>
        <div className="card-race">
          <input
            type="text"
            value={character.race}
            onChange={(e) => handleEdit('race', e.target.value)}
            className="editable-field race-input"
          />
        </div>
      </div>

      <div className="card-body">
        <div className="card-stats">
          <div className="stat-row">
            <span className="stat-label">HP:</span>
            <input
              type="number"
              value={character.hp}
              onChange={(e) => handleEdit('hp', parseInt(e.target.value) || 0)}
              className="editable-field stat-input"
            />
          </div>
          <div className="stat-row">
            <span className="stat-label">AC:</span>
            <input
              type="number"
              value={character.ac}
              onChange={(e) => handleEdit('ac', parseInt(e.target.value) || 0)}
              className="editable-field stat-input"
            />
          </div>
        </div>

        <div className="card-abilities">
          <div className="ability-grid">
            {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map(ability => (
              <div key={ability} className="ability-item">
                <span className="ability-label">{ability.charAt(0).toUpperCase() + ability.slice(1).slice(0, 2)}:</span>
                <input
                  type="number"
                  value={character[ability]}
                  onChange={(e) => handleEdit(ability, parseInt(e.target.value) || 0)}
                  className="editable-field ability-input"
                  min="1"
                  max="20"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card-footer">
        <button className="remove-card-btn" onClick={onRemove}>
          ✕
        </button>
      </div>
    </div>
  )
}

export default CharacterCard 