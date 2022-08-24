import React, { Component } from 'react'
import { View, Text, Button, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import ItemDatabase from './src/database/ItemDatabase.js';
import Item from './src/models/Item.js';
import ItemComponente from './src/components/ItemComponente.js';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      preco: 0.0,
      quantidade: 0,
      lista: []
    }

    this.Listar()
  }


  // TIPO O CONTROLLER, MAS SEM O MVC
  Listar = () => {
    const banco = new ItemDatabase();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }

  Cadastrar = (nome, preco, quantidade) => {
    const itemNovo = new Item(nome, preco, quantidade);
    const banco = new ItemDatabase();
    banco.Inserir(itemNovo)
    this.Listar()
  }

  Atualizar = (item) => {
    const banco = new ItemDatabase();
    banco.Atualizar(item)
    this.Listar()
  }

  Remover = (id) => {
    const banco = new ItemDatabase();
    banco.Remover(id)
    this.Listar()
  }

  render() {
    return (
      <ScrollView>
        {/* Cadastro de Itens */}
        <View style={estilo.linha1}>
          <Text style={estilo.titulo}>CADASTRO DE ITENS</Text>
          <TextInput onChangeText={(valorDigitado) => { this.setState({ nome: valorDigitado }) }} placeholder='Digite o nome do item...' style={estilo.entradasDeDados} />
          <TextInput onChangeText={(valorDigitado) => { this.setState({ preco: valorDigitado }) }} placeholder='Digite o preço do item...' style={estilo.entradasDeDados} />
          <TextInput onChangeText={(valorDigitado) => { this.setState({ quantidade: valorDigitado }) }} placeholder='Digite a quantidade do item...' style={estilo.entradasDeDados} />
          <View style={estilo.areaBotao}>
            <TouchableOpacity style={estilo.botao} onPress={() => this.Cadastrar(this.state.nome, this.state.preco, this.state.quantidade)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>SALVAR</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Listagem de Itens */}
        <View>
          <Text style={estilo.titulo}>LISTA DE ITENS</Text>
          {
            this.state.lista.map(
              item => (
                <ItemComponente
                  key={item.id}
                  item={item}
                  id={item.id}
                  nome={item.nome}
                  preco={item.preco}
                  quantidade={item.quantidade}
                  atualizar={this.Atualizar}
                  deletar={this.Remover}
                />
              )
            )
          }
        </View>

      </ScrollView>
    )
  }
}

const estilo = StyleSheet.create({
  entradasDeDados: {
    borderRadius: 40,
    borderColor: '#c4c4c4',
    borderWidth: 1,
    margin: 3,
    height: 35, width: 300,
    textAlign: 'center'
  },
  titulo: {
    fontSize: 18,
    margin: 5,
    color: 'black'
  },
  botao: {
    width: 150,
    backgroundColor: '#02f0bc',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 55,
    padding: 10,
    elevation: 5,
    margin: 5,
    color: 'white'
  },
  areaBotao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  linha1: {
    alignItems: 'center',
    justifyContent: "center"
  }
})