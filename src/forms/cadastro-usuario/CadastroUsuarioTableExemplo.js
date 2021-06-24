import * as React from 'react';
import { DataGrid, getThemePaletteMode } from '@material-ui/data-grid';

export default class CadastroUsuarioTable_2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currPage: 1
        };
    }

    render() {
        
        const { usuarios } = this.props;

        const columns = [
            {
              field: 'id',
              headerClassName: 'super-app-theme--header',
              headerAlign: 'center',
              headerName: 'Código',
              width: 140,
            },
            {
              field: 'usuario',
              headerClassName: 'super-app-theme--header',
              headerAlign: 'center',
              headerName: 'Usuário',
              width: 300,
            },
            {
                field: 'nome',
                headerClassName: 'super-app-theme--header',
                headerAlign: 'center',
                headerName: 'Nome',
                width: 300,
              },
          ];

        return (
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid rows={usuarios} columns={columns} />
            </div>
        );
    }
}