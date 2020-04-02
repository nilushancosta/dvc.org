import React, { useEffect, useCallback, useState } from 'react'
import cn from 'classnames'

import ShowOnly from '../../ShowOnly'
import Link from '../../Link'
import DownloadButton from '../../DownloadButton'
import GithubLine from './GithubLine'
import { scrollIntoLayout, ease } from '../../../utils/scroll'
import { logEvent } from '../../../utils/ga'

import styles from './styles.module.css'

interface ILandingHeroProps {
  scrollToRef: React.RefObject<HTMLElement>
}

const LandingHero: React.SFC<ILandingHeroProps> = ({ scrollToRef }) => {
  const [activeCommand, setActiveCommand] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setActiveCommand(prev => (prev + 1) % 4),
      3000
    )

    return () => clearInterval(interval)
  }, [])

  const scrollToUseCases = useCallback(() => {
    logEvent('button', 'how-it-works')
    scrollIntoLayout(scrollToRef?.current, {
      smooth: true,
      duration: 800,
      ease: ease.inOutCube
    })
  }, [scrollToRef?.current])

  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <h1 className={styles.title}>
          Open-source
          <br />
          Version Control System
          <br />
          for Machine Learning Projects
        </h1>
        <div className={styles.buttonsContainer}>
          <ShowOnly on="mobile">
            <Link
              className={cn(styles.actionButton, styles.getStartedButton)}
              href="/doc/tutorials/get-started"
            >
              Get started
            </Link>
          </ShowOnly>
          <ShowOnly on="desktop">
            <DownloadButton />
          </ShowOnly>
          <button
            className={cn(styles.actionButton, styles.watchVideoButton)}
            onClick={scrollToUseCases}
          >
            <img
              className={styles.actionButtonIcon}
              src="/img/play-icon.svg"
              alt="Watch video"
              width={20}
              height={20}
            />
            <span>
              <span className={styles.actionButtonMainText}>Watch video</span>
              <span className={styles.actionButtonDescription}>
                How it works
              </span>
            </span>
          </button>
        </div>

        <div className={styles.github}>
          <GithubLine />
        </div>
      </div>

      <ShowOnly on="desktop">
        <div className={styles.commands}>
          <div
            className={cn(styles.command, activeCommand === 0 && styles.active)}
          >
            <span className={styles.line}>$ dvc add images</span>
          </div>
          <div
            className={cn(styles.command, activeCommand === 1 && styles.active)}
          >
            <span className={styles.line}>
              $ dvc run -d images -o model.p cnn.py
            </span>
          </div>
          <div
            className={cn(styles.command, activeCommand === 2 && styles.active)}
          >
            <span className={styles.line}>
              $ dvc remote add -d myrepo s3://mybucket
            </span>
          </div>
          <div
            className={cn(styles.command, activeCommand === 3 && styles.active)}
          >
            <span className={styles.line}>$ dvc push</span>
          </div>
        </div>
      </ShowOnly>
    </div>
  )
}

export default LandingHero
