
module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define('User',{
    
        //modal attribures are defined here
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
            get(){
                const rawValue = this.getDataValue('firstName');
                return rawValue? rawValue.toUpperCase():null;
            }
        },
        lastName:{
            type:DataTypes.STRING,
            defaultValue:'murthy',
            set(value){
                this.setDataValue('lastName', value + ' , Indian')
            }
        },
        fullName:{
            type:DataTypes.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`;
              },
              set(value) {
                throw new Error('Do not try to set the `fullName` value!');
              },
        }
    },{
        // additional options are defined here
        tableName: 'users',
        //timestamps:false
        createdAt:false,
        updatedAt:true,
        
    }
    )
    
    // `sequelize.define` also returns the model
    //console.log(User === sequelize.models.User); // true

    return User
}


