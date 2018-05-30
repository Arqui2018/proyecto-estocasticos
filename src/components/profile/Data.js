import React from "react";
import {Message, Icon} from "semantic-ui-react";


export default({styles})=>{
  return(
    <div>
      <div style={styles.box}>
        <img alt='mapa' src='images/mapa.png'/>
        <Message icon>
          <Icon color='blue' name='user'  />
          <Message.Content>
            <Message.Header>Nombre</Message.Header>
            Dago
          </Message.Content>
        </Message>
        <Message icon>
          <Icon color='green' name='money bill alternate outline'  />
          <Message.Content>
            <Message.Header>Saldo</Message.Header>
            $$$$$
          </Message.Content>
        </Message>




      </div>
    </div>
  )
}
