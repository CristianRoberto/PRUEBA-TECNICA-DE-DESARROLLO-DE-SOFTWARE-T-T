using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace AdministraciónDeUsuarios.Models
{
    public partial class pruebaContext : DbContext
    {
        public pruebaContext()
        {
        }

        public pruebaContext(DbContextOptions<pruebaContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cargo> Cargos { get; set; } = null!;
        public virtual DbSet<Departamento> Departamentos { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cargo>(entity =>
            {
                entity.ToTable("cargos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Activo).HasColumnName("activo");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(50)
                    .HasColumnName("codigo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaCreacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdUsuarioCreacion).HasColumnName("idUsuarioCreacion");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.ToTable("departamentos");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Activo).HasColumnName("activo");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(50)
                    .HasColumnName("codigo");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaCreacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdUsuarioCreacion).HasColumnName("idUsuarioCreacion");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(100)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Usuario, "UQ__users__9AFF8FC6604358AB")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.FechaCreacion)
                    .HasColumnType("datetime")
                    .HasColumnName("fechaCreacion")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdCargo).HasColumnName("idCargo");

                entity.Property(e => e.IdDepartamento).HasColumnName("idDepartamento");

                entity.Property(e => e.PrimerApellido)
                    .HasMaxLength(100)
                    .HasColumnName("primerApellido");

                entity.Property(e => e.PrimerNombre)
                    .HasMaxLength(100)
                    .HasColumnName("primerNombre");

                entity.Property(e => e.SegundoApellido)
                    .HasMaxLength(100)
                    .HasColumnName("segundoApellido");

                entity.Property(e => e.SegundoNombre)
                    .HasMaxLength(100)
                    .HasColumnName("segundoNombre");

                entity.Property(e => e.Usuario)
                    .HasMaxLength(50)
                    .HasColumnName("usuario");

                entity.HasOne(d => d.oCargo)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdCargo)
                    .HasConstraintName("FK__users__idCargo__52593CB8");

                entity.HasOne(d => d.oDepartamento)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.IdDepartamento)
                    .HasConstraintName("FK__users__idDeparta__5165187F");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
