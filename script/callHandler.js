export default (async () => {
  const apiUrlBase = 'https://pokeapi.co/api/v2/pokemon/?limit=2000&offset=0'
  const whiteList = ["wormadam-sandy","wormadam-trash","shaymin-sky","rotom-heat","rotom-wash","rotom-frost","rotom-fan","rotom-mow","castform-sunny","castform-rainy","castform-snowy","darmanitan-zen","meloetta-pirouette","kyurem-black","kyurem-white","venusaur-mega","charizard-mega-x","charizard-mega-y","blastoise-mega","alakazam-mega","gengar-mega","kangaskhan-mega","pinsir-mega","gyarados-mega","aerodactyl-mega","mewtwo-mega-x","mewtwo-mega-y","ampharos-mega","scizor-mega","heracross-mega","houndoom-mega","tyranitar-mega","blaziken-mega","gardevoir-mega","mawile-mega","aggron-mega","medicham-mega","manectric-mega","banette-mega","absol-mega","garchomp-mega","lucario-mega","abomasnow-mega","latias-mega","latios-mega","swampert-mega","sceptile-mega","sableye-mega","altaria-mega","gallade-mega","audino-mega","sharpedo-mega","slowbro-mega","steelix-mega","pidgeot-mega","glalie-mega","diancie-mega","metagross-mega","kyogre-primal","groudon-primal","rayquaza-mega","hoopa-unbound","camerupt-mega","lopunny-mega","salamence-mega","beedrill-mega","rattata-alola","raticate-alola","raichu-alola","sandshrew-alola","sandslash-alola","vulpix-alola","ninetales-alola","diglett-alola","dugtrio-alola","meowth-alola","persian-alola","geodude-alola","graveler-alola","golem-alola","grimer-alola","muk-alola","exeggutor-alola","marowak-alola","oricorio-pom-pom","oricorio-pau","oricorio-sensu","lycanroc-midnight","lycanroc-dusk","necrozma-dusk","necrozma-dawn","necrozma-ultra","meowth-galar","ponyta-galar","rapidash-galar","slowpoke-galar","slowbro-galar","farfetchd-galar","weezing-galar","mr-mime-galar","articuno-galar","zapdos-galar","moltres-galar","slowking-galar","corsola-galar","zigzagoon-galar","linoone-galar","darumaka-galar","darmanitan-galar-standard","darmanitan-galar-zen","yamask-galar","stunfisk-galar","morpeko-hangry","zacian-crowned","zamazenta-crowned","eternatus-eternamax","urshifu-rapid-strike","calyrex-ice","calyrex-shadow","growlithe-hisui","arcanine-hisui","voltorb-hisui","electrode-hisui","typhlosion-hisui","qwilfish-hisui","sneasel-hisui","samurott-hisui","lilligant-hisui","zorua-hisui","zoroark-hisui","braviary-hisui","sliggoo-hisui","goodra-hisui","avalugg-hisui","decidueye-hisui","dialga-origin","palkia-origin","tauros-paldea-combat-breed","tauros-paldea-blaze-breed","tauros-paldea-aqua-breed","wooper-paldea","palafin-hero"]

  try{
    const response =  await fetch(apiUrlBase)
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json()
    let results = data.results 
    
    var apiCalls = await Promise.all(
      results.map( async (result, index) => {
        if (result.url.split("/")[6] >= 10000) {
          if(whiteList.indexOf(result.name) !== -1) {
          } else {
            return;
          }
        }
        const response = await fetch(result.url);
        const pokemonData = await response.json();
        
        if (typeof pokemonData.sprites.other['official-artwork'].front_default === 'string') {
          return result.url;
        }
      }
    ))
    apiCalls = apiCalls.filter(call => call !== undefined);
    document.dispatchEvent(new CustomEvent('loaded', {
      detail: {
        callList: apiCalls
      }
    }))

  }catch(error){
    console.log(error)
  }
})();