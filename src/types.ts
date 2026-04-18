/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AnimalType = '狗' | '貓';

export interface Animal {
  id: string;
  name: string;
  type: AnimalType;
  age: string;
  gender: '公' | '母';
  personality: string[];
  health: string;
  image: string;
  description: string;
}

export interface AdoptionMessage {
  name: string;
  phone: string;
  animalName: string;
}
