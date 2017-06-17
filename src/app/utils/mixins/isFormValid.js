export default {
    computed: {
        isFormValid() {
            return Object.keys(this.fields).every(key => this.fields[key].valid);
        }
    }
};
