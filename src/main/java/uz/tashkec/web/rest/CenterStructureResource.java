package uz.tashkec.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.tashkec.repository.CenterStructureRepository;
import uz.tashkec.service.CenterStructureService;
import uz.tashkec.service.dto.CenterStructureDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.CenterStructure}.
 */
@RestController
@RequestMapping("/api")
public class CenterStructureResource {

    private final Logger log = LoggerFactory.getLogger(CenterStructureResource.class);

    private static final String ENTITY_NAME = "centerStructure";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CenterStructureService centerStructureService;

    private final CenterStructureRepository centerStructureRepository;

    public CenterStructureResource(CenterStructureService centerStructureService, CenterStructureRepository centerStructureRepository) {
        this.centerStructureService = centerStructureService;
        this.centerStructureRepository = centerStructureRepository;
    }

    /**
     * {@code POST  /center-structures} : Create a new centerStructure.
     *
     * @param centerStructureDTO the centerStructureDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new centerStructureDTO, or with status {@code 400 (Bad Request)} if the centerStructure has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/center-structures")
    public ResponseEntity<CenterStructureDTO> createCenterStructure(@RequestBody CenterStructureDTO centerStructureDTO)
        throws URISyntaxException {
        log.debug("REST request to save CenterStructure : {}", centerStructureDTO);
        if (centerStructureDTO.getId() != null) {
            throw new BadRequestAlertException("A new centerStructure cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CenterStructureDTO result = centerStructureService.save(centerStructureDTO);
        return ResponseEntity
            .created(new URI("/api/center-structures/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /center-structures/:id} : Updates an existing centerStructure.
     *
     * @param id the id of the centerStructureDTO to save.
     * @param centerStructureDTO the centerStructureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated centerStructureDTO,
     * or with status {@code 400 (Bad Request)} if the centerStructureDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the centerStructureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/center-structures/{id}")
    public ResponseEntity<CenterStructureDTO> updateCenterStructure(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CenterStructureDTO centerStructureDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CenterStructure : {}, {}", id, centerStructureDTO);
        if (centerStructureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, centerStructureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!centerStructureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CenterStructureDTO result = centerStructureService.update(centerStructureDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, centerStructureDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /center-structures/:id} : Partial updates given fields of an existing centerStructure, field will ignore if it is null
     *
     * @param id the id of the centerStructureDTO to save.
     * @param centerStructureDTO the centerStructureDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated centerStructureDTO,
     * or with status {@code 400 (Bad Request)} if the centerStructureDTO is not valid,
     * or with status {@code 404 (Not Found)} if the centerStructureDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the centerStructureDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/center-structures/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CenterStructureDTO> partialUpdateCenterStructure(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CenterStructureDTO centerStructureDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CenterStructure partially : {}, {}", id, centerStructureDTO);
        if (centerStructureDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, centerStructureDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!centerStructureRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CenterStructureDTO> result = centerStructureService.partialUpdate(centerStructureDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, centerStructureDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /center-structures} : get all the centerStructures.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of centerStructures in body.
     */
    @GetMapping("/center-structures")
    public List<CenterStructureDTO> getAllCenterStructures() {
        log.debug("REST request to get all CenterStructures");
        return centerStructureService.findAll();
    }

    /**
     * {@code GET  /center-structures/:id} : get the "id" centerStructure.
     *
     * @param id the id of the centerStructureDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the centerStructureDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/center-structures/{id}")
    public ResponseEntity<CenterStructureDTO> getCenterStructure(@PathVariable Long id) {
        log.debug("REST request to get CenterStructure : {}", id);
        Optional<CenterStructureDTO> centerStructureDTO = centerStructureService.findOne(id);
        return ResponseUtil.wrapOrNotFound(centerStructureDTO);
    }

    /**
     * {@code DELETE  /center-structures/:id} : delete the "id" centerStructure.
     *
     * @param id the id of the centerStructureDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/center-structures/{id}")
    public ResponseEntity<Void> deleteCenterStructure(@PathVariable Long id) {
        log.debug("REST request to delete CenterStructure : {}", id);
        centerStructureService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
