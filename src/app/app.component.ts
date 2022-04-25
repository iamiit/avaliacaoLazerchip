import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddFuncionarioComponent } from './add-funcionario/add-funcionario.component';
import { ApiService } from './services/api.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AvaliacaoLazerChip';

  displayedColumns: string[] = ['id', 'nome', 'sobrenome', 'idade', 'sexo', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog.open(AddFuncionarioComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllUsers();
      }
    })
  }

  getAllUsers() {
    this.api.getUsers()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Users");
        }
      })
  }

  editUser(row: any) {
    this.dialog.open(AddFuncionarioComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllUsers();
      }
    })
  }

  deleteUser(id: number) {
    this.api.deleteProduct(id)
      .subscribe({
        next:(res)=>{
          alert("Usuário excluído com sucesso");
          this.getAllUsers();
        },
        error:()=>{
          alert("Erro ao excluir o usuário !!")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
