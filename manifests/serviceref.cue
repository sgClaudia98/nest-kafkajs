
// Automatically generated file. Do not edit.
package service

import (
  k "kumori.systems/kumori:kumori"
  m "...:kmodule"
)

#Artifact: k.#Artifact & {
  spec: m.spec
  ref: {
    version: m.version
    if m.prerelease != _|_ {
      prerelease: m.prerelease
    }
    if m.buildmetadata != _|_ {
      buildmetadata: m.buildmetadata
    }
    domain: m.domain
    module: m.module
    kind: "service"
  }
}
