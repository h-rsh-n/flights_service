class CrudRepository{
  constructor(model){
    this.model = model;
  }

  async create(data){
    const response = await this.model.create(data);
    return response;
  }
  

  async destroy(id){
    const response = await this.model.destroy({
      where:{
        id:id
      }
    });
    return response;
  }

  async get(data){
    const response = await this.model.findByPk(data);
    return response;
    
  }

  async getAll(){
    const response = await this.model.findAll();
    return response;
  }

  async update(id,data){ // data->{}, should be a object;
    const response = await this.model.update(data,{
      where:{
        id:id
      }
    })
  }
}

module.exports = CrudRepository;