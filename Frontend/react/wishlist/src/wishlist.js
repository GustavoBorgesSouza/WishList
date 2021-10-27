import { Component } from "react";

export default class Wishlist extends Component{
    constructor(props){
        super(props);
        this.state = {
            listaDesejos : [],
            idUsuario : 0,
            idDesejo: 0,
            tituloDesejo : "",
            descricaoDesejo : ""
        }
    };

    limparCampos = () => {
        this.setState({
            idUsuario : 0,
            idDesejo: 0,
            tituloDesejo : "",
            descricaoDesejo : ""
        })
        console.log('Os states foram resetados!')
    };

    buscarDesejos =() => {
        console.log("Vamos fazer a chamada para a API")

        //talvez mudar a rota, a confirmar
        fetch("http://localhost:5000/api/wishlist")

        .then(resposta => resposta.json)

        .then(dados => this.setState({listaDesejos : dados}))

        .catch(erro => console.log(erro))
    }

        //onChange vai disparar por tecla e invocar essa funcao.
    atualizaEstadoUsuario = async (event) => {
        //console.log('acionou essa funcao')

        await this.setState({
            //dizendo que o target (alvo) do evento ,  vamos pegar o value(valor) 
            idUsuario: event.target.value,
        });
        
    };
    atualizaEstadoTitulo = async (event) => {
        //console.log('acionou essa funcao')

        await this.setState({
            //dizendo que o target (alvo) do evento ,  vamos pegar o value(valor) 
            tituloDesejo: event.target.value,
        });
        
    };
    atualizaEstadoDescricao = async (event) => {
        //console.log('acionou essa funcao')

        await this.setState({
            //dizendo que o target (alvo) do evento ,  vamos pegar o value(valor) 
            descricaoDesejo: event.target.value,
        });
        
    };

    cadastrarDesejo = (submit_formulario) => {
        submit_formulario.preventDefault();

        fetch('http://localhost:5000/api/wishlist', {
            method: 'POST',
            body: JSON.stringify({
                IdDesejo: this.state.idDesejo,
                idUsuario: this.state.idUsuario,
                titulo: this.state.tituloDesejo,
                descricao: this.state.descricaoDesejo
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        .then(console.log("Desejo cadastrado"))
        .catch(erro => console.log(erro))
        .then(this.buscarDesejos)
        .then(this.limparCampos)
    }

    componentDidMount(){
        this.buscarDesejos()
    } 

    render(){
        return(
            <div>
                <section>
                    <h1>Essa é a sua lista de desejos</h1>
                    <form onSubmit={this.cadastrarDesejo}>
                        <input value={this.state.idUsuario} onChange={this.atualizaEstadoUsuario} type="text" placeholder="Digite um id de usuário" />
                        <input value={this.state.tituloDesejo} onChange={this.atualizaEstadoTitulo} type="text" placeholder="Digite um titulo para seu desejo" />
                        <input value={this.state.descricaoDesejo} onChange={this.atualizaEstadoDescricao} type="text" placeholder="Digite a descrição do seu desejo" />
                        <button type="submit">Cadastrar</button>
                    </form>
                </section>

                <section>
                    <h2>Lista de Desejos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>idUsuario</th>
                                <th>TituloDesejo</th>
                                <th>DescriçãoDesejo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0</td>
                                <td>{this.state.idUsuario}</td>
                                <td>{this.state.tituloDesejo}</td>
                                <td>{this.state.descricaoDesejo}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
}
