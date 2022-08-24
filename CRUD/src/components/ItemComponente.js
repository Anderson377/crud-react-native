import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class ItemComponente extends Component {
    getEstilo() {
        if (this.props.quantidade > 10) {
            return { color: 'green' }
        } else if (this.props.quantidade <= 10 && this.props.quantidade > 0) {
            return { color: 'blue' }
        } else if (this.props.quantidade == 0) {
            return { color: 'red' }
        } else {
            return { color: 'black' }
        }
    }

    render() {
        return (
            <View style={{ margin: 5 }}>
                <Text>Nome: {this.props.nome}</Text>
                <Text>Preço: {this.props.preco}</Text>
                <Text style={this.getEstilo()}>Quantidade: {this.props.quantidade}</Text>

                <View style={estilo.areaBotao}>
                    <TouchableOpacity style={estilo.botao} onPress={() => this.props.atualizar(this.props.item)}>
                        <Text style={{ color: 'white' }}>VENDIDO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={estilo.botao2} onPress={() => this.props.deletar(this.props.id)}>
                        <Text style={{ color: 'white' }}>REMOVER</Text>
                    </TouchableOpacity>


                </View>
            </View>
        )
    }
}

const estilo = StyleSheet.create({

    botao: {
        width: 100,
        backgroundColor: '#0A66F8',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 55,
        padding: 5,
        margin: 5,
        color: 'white'
    },

    botao2: {
        width: 100,
        backgroundColor: '#db021c',
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 55,
        padding: 5,
        margin: 5,
        color: 'white'
    },
    areaBotao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    }
})