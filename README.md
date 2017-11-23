## React Async Effect

## The problem

You want to render the result of an asynchronously effect (action) that happens
outside the scope of the component. In order to do so, you have to take care and
be aware of the communication format (is it a promise, an observable or a
pubsub?) and not only, you should manage race condition against the component
unmounting. More, you also need to represent the current state of that action on
screen, being either a pending state, an error or the proper result. In case of
error, you want to allow user to retry.

## This solution

This component helps on the creation of components that provides control over an
async effect, so it deals only with its task. Also, it normalizes the way of
work on imperative effects modeled as components.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Props](#props)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Props

TBD
