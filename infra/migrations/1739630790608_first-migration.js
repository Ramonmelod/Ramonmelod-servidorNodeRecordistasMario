/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.up = (pgm) => {
  pgm.createTable("listarecordistas", {
    i_idrecordista_listarecordistas: {
      type: "SERIAL",
      primaryKey: true,
    },
    s_nome_listarecordistas: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    i_pontuacao_listarecordistas: {
      type: "INT",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 */
exports.down = (pgm) => {
  pgm.dropTable("listarecordistas");
};
