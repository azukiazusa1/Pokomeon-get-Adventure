import axios from 'axios'

const mixin = {
	methods: {
    getI18nName: function() {
        const names = this.species.names
        const result = names.find(v => v.language.name === this.$language[this.local])
        this.name = result.name
    },
    getI18nGenera: function() {
        const genera = this.species.genera
        const result = genera.find(v => v.language.name === this.$language[this.local])
        this.genera = result.genus
    },
    getTypes: async function () {
      const urls = []
      for (const type of this.pokemon.types) {
        urls.push(type.type.url)
      }
      const types = await Promise.all(urls.map(axios.get))
      this.getI18nType(types)
    },
    getI18nType: function(types) {
      let result_types = ''
      for (const type of types) {
        const type_name = type.data.names.find(v => v.language.name === this.$language[this.local])
        result_types += `《${type_name.name}》`
      }
      this.type = result_types
    },
  }
}

export default mixin