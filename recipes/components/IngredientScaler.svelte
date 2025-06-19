<script>
  export let ingredients; 

  let servings = 1;

  function scaleMeasure(measure, factor) {
    if (!measure) return '';
    const numericPart = parseFloat(measure.match(/[\d\.]+/));
    if (isNaN(numericPart)) {
      return measure; 
    }
    const unit = measure.replace(/[\d\.]+\s*/, '');
    return `${(numericPart * factor).toFixed(2)} ${unit}`;
  }
</script>

<div class="scaler-container">
  <label for="servings">Porciones:</label>
  <input type="number" id="servings" min="1" bind:value={servings} />
</div>

<ul>
  {#each ingredients as ingredient}
    <li>
      <strong>{scaleMeasure(ingredient.measure, servings)}</strong>
      de {ingredient.name}
    </li>
  {/each}
</ul>

<style>
  .scaler-container { margin-bottom: 1em; }
  ul { list-style: circle; padding-left: 20px; }
  input { width: 60px; font-size: 1em; }
</style>