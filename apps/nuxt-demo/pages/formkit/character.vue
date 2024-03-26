<script setup>
import { getNode } from '@formkit/core'

function castRangeToNumber(node) {
  // We add a check to add the cast only to range inputs
  if (node.props.type !== 'range') return

  node.hook.input((value, next) => next(Number(value)))
}

const CHARACTER_BASE_STATS = {
  Warrior: {
    strength: 9,
    skill: 1,
    dexterity: 5,
  },
  Mage: {
    strength: 5,
    skill: 10,
    dexterity: 8,
  },
  Assassin: {
    strength: 5,
    skill: 4,
    dexterity: 10,
  },
}

// We add it inside a onMounted to make sure the node exists
onMounted(() => {
  // Use the IDs of the inputs you want to get, for our case the class and the attributes group
  const classNode = getNode('class')
  const attributesNode = getNode('attributes')

  // Here we are listening for the 'commit' event
  classNode.on('commit', ({ payload }) => {
    // We update the value of the attributes group using its children name to pass down automatically by FormKit
    attributesNode.input(CHARACTER_BASE_STATS[payload])
  })
})

async function createCharacter(fields) {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(JSON.stringify(fields))
}
</script>

<template>
  <div>
    <div><h4 class="form-label">Updating values based on the class input</h4></div>
    <h1>New Character</h1>

    <FormKit v-slot="{ value }" type="form" :plugins="[castRangeToNumber]" submit-label="Create Character" @submit="createCharacter">
      <FormKit id="name" type="text" name="name" validation="required|not:Admin" label="Name" help="Your fullname" placeholder="Please add your name" />

      <FormKit id="class" type="select" label="Class" name="class" placeholder="Select a class" :options="['Warrior', 'Mage', 'Assassin']" />

      <FormKit id="attributes" type="group" name="attributes">
        <FormKit id="skill" type="range" name="skill" label="Skill" value="5" min="1" max="10" step="1" help="How much skill points to start with" />

        <FormKit id="strength" type="range" name="strength" label="Strength" value="5" min="1" max="10" step="1" help="How much strength points to start with" />

        <FormKit id="dexterity" type="range" name="dexterity" label="Dexterity" value="5" min="1" max="10" step="1" help="How many dexterity points should this character have?" />
      </FormKit>
      <pre wrap>{{ value }}</pre>
    </FormKit>

    <p>
      <em>
        <small> Change the character's class to see the changes in attribute values. </small>
      </em>
    </p>
  </div>
</template>
