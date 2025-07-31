import React, { useState } from 'react'
import CharacterDeck from './components/CharacterDeck'
import './styles/App.css'

function App() {
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Gandalf the Grey",
      class: "Wizard",
      level: 5,
      race: "Human",
      hp: 32,
      ac: 15,
      strength: 10,
      dexterity: 14,
      constitution: 12,
      intelligence: 18,
      wisdom: 16,
      charisma: 14
    },
    {
      id: 2,
      name: "Aragorn",
      class: "Ranger",
      level: 6,
      race: "Human",
      hp: 45,
      ac: 16,
      strength: 16,
      dexterity: 16,
      constitution: 14,
      intelligence: 12,
      wisdom: 14,
      charisma: 16
    }
  ])

  const addCharacter = () => {
    const newCharacter = {
      id: Date.now(),
      name: "New Character",
      class: "Fighter",
      level: 1,
      race: "Human",
      hp: 10,
      ac: 10,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10
    }
    setCharacters([...characters, newCharacter])
  }

  const removeCharacter = (id) => {
    setCharacters(characters.filter(char => char.id !== id))
  }

  const updateCharacter = (id, field, value) => {
    setCharacters(characters.map(char => 
      char.id === id ? { ...char, [field]: value } : char
    ))
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>D&D Character Cards</h1>
        <button className="add-character-btn" onClick={addCharacter}>
          + Add Character
        </button>
      </header>
      
      <main className="app-main">
        <CharacterDeck 
          characters={characters}
          onRemoveCharacter={removeCharacter}
          onUpdateCharacter={updateCharacter}
        />
      </main>
    </div>
  )
}

export default App 