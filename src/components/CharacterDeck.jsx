import React from 'react'
import CharacterCard from './CharacterCard'
import '../styles/CharacterDeck.css'

const CharacterDeck = ({ characters, onRemoveCharacter, onUpdateCharacter }) => {
  return (
    <div className="character-deck">
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          index={index}
          onRemove={() => onRemoveCharacter(character.id)}
          onUpdate={(field, value) => onUpdateCharacter(character.id, field, value)}
        />
      ))}
    </div>
  )
}

export default CharacterDeck 