import {client} from '../utils/os'

abstract class Service {
    abstract service: string
    requireRoot: boolean = false

    start = async (): Promise<boolean> =>
        this.requireRoot ?
            client().serviceCtl.startAsRoot(this.service) :
            client().serviceCtl.start(this.service)

    stop = async (): Promise<boolean> =>
        this.requireRoot ?
            client().serviceCtl.stopAsRoot(this.service) :
            client().serviceCtl.stop(this.service)

    restart = async (): Promise<boolean> =>
        this.requireRoot ?
            client().serviceCtl.restartAsRoot(this.service) :
            client().serviceCtl.restart(this.service)

    install = (): Promise<boolean> => {
        return client().packageManager.install(this.service)
    }

    abstract configure(): Promise<boolean>
}

export default Service