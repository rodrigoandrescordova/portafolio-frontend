import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { UsuariosService } from '../../../core/services/usuarios.service';
import { Usuario } from '../../../core/models/usuario.model';

@Component({
  selector: 'app-usuario-detail',
  templateUrl: './usuario-detail.component.html',
  styleUrls: ['./usuario-detail.component.scss'],
  standalone: false,
})
export class UsuarioDetailComponent implements OnInit {
  loading = true;
  usuario: Usuario | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly usuariosService: UsuariosService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id') ?? '';
          return this.usuariosService.findOne(id);
        }),
      )
      .subscribe({
        next: (usuario) => {
          this.usuario = usuario;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/usuarios']);
        },
      });
  }

  getInitials(): string {
    if (!this.usuario) return '';
    const first = this.usuario.nombres.charAt(0).toUpperCase();
    const last = this.usuario.apellidoPaterno.charAt(0).toUpperCase();
    return `${first}${last}`;
  }
}
