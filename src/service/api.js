import { Text } from "react-native";
import React, { Component } from "react";
import { receitas, ingredientes } from "./receitas";
export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

export function getArraysIngredientes(ingredientes) {
  let qntIngsEncontrados = 0;
  let receitasEncontradas = [];

  receitas.forEach((receita) => {
    qntIngsEncontrados = 0;
    let ingredientesDaReceita = receita.ingredientes;
    ingredientesDaReceita.forEach((ings) => {
      ingredientes.forEach((ingrediente) => {
        if (ings[0] == ingrediente.ingredienteId) {
          qntIngsEncontrados++;
        }
      });
    });

    if (qntIngsEncontrados == ingredientes.length) {
      receitasEncontradas.push(receita);
    }
  });
  return receitasEncontradas;
}

//busco
export function getNomeIngrediente(ingredienteId) {
  let nome;
  ingredientes.map((data) => {
    if (data.ingredienteId == ingredienteId) {
      nome = data.nome;
    }
  });
  return nome;
}

export function getImagemIngrediente(ingredienteId) {
  let url;
  ingredientes.map((data) => {
    if (data.ingredienteId == ingredienteId) {
      url = data.imagem;
    }
  });
  return url;
}

// modifica
export function getReceitasPorIngredientes(ingredienteId) {
  const receitasArray = [];
  receitas.map((data) => {
    data.ingredientes.map((index) => {
      if (index[0] == ingredienteId) {
        receitasArray.push(data);
      }
    });
  });
  return receitasArray;
}

export function getTodosIngredientes(idArray) {
  const ingredientesArray = [];
  idArray.map((index) => {
    ingredientes.map((data) => {
      if (data.ingredienteId == index[0]) {
        ingredientesArray.push([data, index[1]]);
      }
    });
  });
  return ingredientesArray;
}

// busca
export function getReceitasPorNomeIngredientes(ingredienteNome) {
  const nomeUpper = ingredienteNome.toUpperCase();
  const receitasArray = [];
  ingredientes.map((data) => {
    if (data.nome.toUpperCase().includes(nomeUpper)) {
      const receitas = getReceitasPorIngredientes(data.ingredienteId);
      const unique = [...new Set(receitas)];
      unique.map((item) => {
        receitasArray.push(item);
      });
    }
  });
  const uniqueArray = [...new Set(receitasArray)];
  return uniqueArray;
}

export function getReceitasPorNome(receitasNome) {
  const nomeUpper = receitasNome.toUpperCase();
  const receitasArray = [];
  receitas.map((data) => {
    if (data.nome.toUpperCase().includes(nomeUpper)) {
      receitasArray.push(data);
    }
  });
  return receitasArray;
}
