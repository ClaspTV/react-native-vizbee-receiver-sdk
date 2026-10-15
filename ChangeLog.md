# Change Log
All notable changes to VizbeeKit will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).


## [Unreleased]
### Added
### Changed (deprecated tag)
### Updated
### Deprecated 
### Removed
### Fixed
### Security

## [0.0.27] - 2026-10-14
### Updated
    Updated range for react-native from '>=0.60.0 <=0.80.1' -> '>=0.60.0 <=0.87.1'
    Raised compileSdk from 32 to 34, required by React Native 0.87.1 and current AndroidX dependencies.
    Pinned the Android native receiver SDKs: firetv-receiver-sdk 4.2.8 and androidtv-receiver-sdk 4.2.5.
### Removed
    Removed the legacy buildscript block from android/build.gradle that referenced the shut-down JCenter repository.
    The Android Gradle Plugin classpath is inherited from the host application, so this module does not need its own repository declaration.

## [0.0.26] - 2026-03-26
### Updated
    Updated range  for react-native from '^0.41.2' ->   '>=0.60.0 <=0.80.1'
### Fixed
    Issue video status fails with exception when track info is null.

## [0.0.25] - 2025-04-10
### Updated
    Android support for passing Options when initializing the sdk

