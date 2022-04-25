import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-add-funcionario',
  templateUrl: './add-funcionario.component.html',
  styleUrls: ['./add-funcionario.component.scss']
})
export class AddFuncionarioComponent implements OnInit {

  userForm !: FormGroup;
  actionBtn: string = "Salvar";
  id: number = 0;
  popupHeader: string = 'Add Funcionário Form';
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<AddFuncionarioComponent>) {
    this.api.getUsers().subscribe((users: Array<any>) => {
      this.id = Math.max.apply(Math, users.map(function (o) { return o.id; }))
      this.userForm.patchValue({ id: this.id + 1 });
    })

  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      idade: ['', Validators.required],
      sexo: ['', Validators.required]
    })


    if (this.editData) {
      this.actionBtn = "Atualizar";
      this.userForm.controls['id'].setValue(this.editData.id);
      this.userForm.controls['nome'].setValue(this.editData.nome);
      this.userForm.controls['sobrenome'].setValue(this.editData.sobrenome);
      this.userForm.controls['idade'].setValue(this.editData.idade);
      this.userForm.controls['sexo'].setValue(this.editData.sexo);
      this.popupHeader = 'Editar Funcionário Form';
    }
  }

  addUser() {
    if (!this.editData) {
      if (this.userForm.valid) {
        this.api.postUsers(this.userForm.value)
          .subscribe({
            next: (res) => {
              alert("Usuário adicionado com sucesso");
              this.userForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Erro ao adicionar o usuário")
            }
          })
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.userForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Usuário atualizado com sucesso");
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Erro ao atualizado o usuário")
        }
      })
  }

}
