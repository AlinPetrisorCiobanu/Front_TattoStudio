export const validate = (type, value) => {
  switch (type) {
    case "name":
      if (value.length < 2) {
        return "!el nombre es demasiado corto";
      } else {
        return "";
      }
    case "lastName":
      if (value.length < 4) {
        return "!el/los apellido/s demasiado corto";
      } else {
        return "";
      }
    case "idUser":
      if (value.length !== 8) {
        return "!DNI o NIE longitud incorecta";
      } else if (value.length < 8) {
        return "!DNI o NIE es demasiado corto";
      } else {
        return "";
      }
    case "tlf":
      if (!/^\d{9}$/g.test(value)) {
        return "!formato incorecto!";
      } else {
        return "";
      }
    case "years":
      if (!/^\d{4}$/g.test(value)) {
        return "!formato incorecto!";
      } else if (value > new Date().getFullYear()) {
        return "!no puedes haber nacido en futuro. ¿O SI?!";
      } else if (value < new Date().getFullYear() - 120) {
        return `!unpoco viejo para hacerse tatuajes con ${
          new Date().getFullYear() - value
        } años !!!!`;
      } else {
        return "";
      }
    case "email":
      if (value.length < 8) {
        return "!campo email vacio!";
      } else {
        if (
          !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,48}$/g.test(value)
        ) {
          return "!formato incorecto!";
        } else {
          return "";
        }
      }
    case "password":
      if (value.length < 1) {
        return "!campo contraseña vacio!";
      } else {
        if (!/[\d()+-]/g.test(value)) {
          return "El formato es incorecto";
        } else {
          return "";
        }
      }
    case "startTime":
        if (value.toString().length < 5) {
          return "!campo horario corto!";
        } 
        else if (value.toString().length > 5) {
          return "!campo horario largo!";
        } else if (
          (value < "10:00" || value > "13:00") &&
          (value < "15:00" || value > "17:00")
        ) {
          return "esta fuera del horraio";
        }else{
          return ""
        }    
  }
};

