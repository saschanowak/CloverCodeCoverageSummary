import {expect, test} from '@jest/globals'
import {readFile} from 'fs/promises'
import path from 'path'
import {getMetricRow, run} from '../src/main'
import {existsSync} from 'fs'

test('Row metric with 100.00%', () => {
  const metrics = {
    loc: 50,
    ncloc: 50,
    methods: 10,
    coveredmethods: 10,
    conditionals: 0,
    coveredconditionals: 0,
    statements: 100,
    coveredstatements: 100,
    elements: 1,
    coveredelements: 1,
    classes: 1,
    coveredclasses: 1
  }

  expect(getMetricRow('foo', metrics)).toBe(`<tr>
  <td>foo
  <td align="center">100.00%
  <td align="right">100/100
  <td align="center">100.00%
  <td align="right">10/10
  <td align="center">100.00%
  <td align="right">1/1
  <td align="center">🚀`)
})

test('Row metric with 90.00%', () => {
  const metrics = {
    loc: 50,
    ncloc: 50,
    methods: 10,
    coveredmethods: 9,
    conditionals: 0,
    coveredconditionals: 0,
    statements: 100,
    coveredstatements: 100,
    elements: 10,
    coveredelements: 9,
    classes: 10,
    coveredclasses: 9
  }

  expect(getMetricRow('foo', metrics)).toBe(`<tr>
  <td>foo
  <td align="center">100.00%
  <td align="right">100/100
  <td align="center">90.00%
  <td align="right">9/10
  <td align="center">90.00%
  <td align="right">9/10
  <td align="center">✅`)
})

test('Row metric with 60.00%', () => {
  const metrics = {
    loc: 50,
    ncloc: 50,
    methods: 10,
    coveredmethods: 6,
    conditionals: 0,
    coveredconditionals: 0,
    statements: 100,
    coveredstatements: 100,
    elements: 10,
    coveredelements: 6,
    classes: 10,
    coveredclasses: 6
  }

  expect(getMetricRow('foo', metrics)).toBe(`<tr>
  <td>foo
  <td align="center">100.00%
  <td align="right">100/100
  <td align="center">60.00%
  <td align="right">6/10
  <td align="center">60.00%
  <td align="right">6/10
  <td align="center">➖`)
})

test('Row metric with 0%', () => {
  const metrics = {
    loc: 50,
    ncloc: 50,
    methods: 10,
    coveredmethods: 0,
    conditionals: 0,
    coveredconditionals: 0,
    statements: 100,
    coveredstatements: 0,
    elements: 10,
    coveredelements: 0,
    classes: 10,
    coveredclasses: 0
  }

  expect(getMetricRow('foo', metrics)).toBe(`<tr>
  <td>foo
  <td align="center">0.00%
  <td align="right">0/100
  <td align="center">0.00%
  <td align="right">0/10
  <td align="center">0.00%
  <td align="right">0/10
  <td align="center">❌`)
})

test('Row metric with bold style', () => {
  const metrics = {
    loc: 50,
    ncloc: 50,
    methods: 10,
    coveredmethods: 10,
    conditionals: 0,
    coveredconditionals: 0,
    statements: 100,
    coveredstatements: 100,
    elements: 1,
    coveredelements: 1,
    classes: 1,
    coveredclasses: 1
  }

  expect(getMetricRow('foo', metrics, true)).toBe(`<tr>
  <td><strong>foo
  <td align="center"><strong>100.00%
  <td align="right"><strong>100/100
  <td align="center"><strong>100.00%
  <td align="right"><strong>10/10
  <td align="center"><strong>100.00%
  <td align="right"><strong>1/1
  <td align="center"><strong>🚀`)
})

test('Markdown generation 1', async () => {
  process.env['INPUT_FILENAME'] = './__tests__/data/clover1.xml'
  const generated = await run()
  const summary = (
    await readFile(path.resolve('./__tests__/data/code-coverage-summary.md'))
  ).toString()
  const details = (
    await readFile(path.resolve('./__tests__/data/code-coverage-details.md'))
  ).toString()
  expect(summary).toBe(generated.summary)
  expect(details).toBe(generated.details)
  expect(existsSync(path.resolve('./code-coverage-summary.md'))).toBeTruthy()
  expect(existsSync(path.resolve('./code-coverage-details.md'))).toBeTruthy()
})

test('Markdown generation 2', async () => {
  process.env['INPUT_FILENAME'] = './__tests__/data/clover2.xml'
  const generated = await run()
  const summary = (
    await readFile(path.resolve('./__tests__/data/code-coverage-summary.md'))
  ).toString()
  const details = (
    await readFile(path.resolve('./__tests__/data/code-coverage-details.md'))
  ).toString()
  expect(summary).toBe(generated.summary)
  expect(details).toBe(generated.details)
  expect(existsSync(path.resolve('./code-coverage-summary.md'))).toBeTruthy()
  expect(existsSync(path.resolve('./code-coverage-details.md'))).toBeTruthy()
})

test('Markdown generation 3', async () => {
  process.env['INPUT_FILENAME'] = './__tests__/data/clover3.xml'
  const generated = await run()
  const summary = (
    await readFile(path.resolve('./__tests__/data/code-coverage-summary.md'))
  ).toString()
  const details = (
    await readFile(path.resolve('./__tests__/data/code-coverage-details.md'))
  ).toString()
  expect(summary).toBe(generated.summary)
  expect(details).toBe(generated.details)
  expect(existsSync(path.resolve('./code-coverage-summary.md'))).toBeTruthy()
  expect(existsSync(path.resolve('./code-coverage-details.md'))).toBeTruthy()
})

test('Markdown generation 4', async () => {
  process.env['INPUT_FILENAME'] = './__tests__/data/clover4.xml'
  const generated = await run()
  const summary = (
    await readFile(path.resolve('./__tests__/data/code-coverage-summary.md'))
  ).toString()
  const details = (
    await readFile(path.resolve('./__tests__/data/code-coverage-details.md'))
  ).toString()
  expect(summary).toBe(generated.summary)
  expect(details).toBe(generated.details)
  expect(existsSync(path.resolve('./code-coverage-summary.md'))).toBeTruthy()
  expect(existsSync(path.resolve('./code-coverage-details.md'))).toBeTruthy()
})
