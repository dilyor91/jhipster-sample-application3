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
import uz.tashkec.repository.MaterialTopicLevelRepository;
import uz.tashkec.service.MaterialTopicLevelService;
import uz.tashkec.service.dto.MaterialTopicLevelDTO;
import uz.tashkec.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.tashkec.domain.MaterialTopicLevel}.
 */
@RestController
@RequestMapping("/api")
public class MaterialTopicLevelResource {

    private final Logger log = LoggerFactory.getLogger(MaterialTopicLevelResource.class);

    private static final String ENTITY_NAME = "materialTopicLevel";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MaterialTopicLevelService materialTopicLevelService;

    private final MaterialTopicLevelRepository materialTopicLevelRepository;

    public MaterialTopicLevelResource(
        MaterialTopicLevelService materialTopicLevelService,
        MaterialTopicLevelRepository materialTopicLevelRepository
    ) {
        this.materialTopicLevelService = materialTopicLevelService;
        this.materialTopicLevelRepository = materialTopicLevelRepository;
    }

    /**
     * {@code POST  /material-topic-levels} : Create a new materialTopicLevel.
     *
     * @param materialTopicLevelDTO the materialTopicLevelDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new materialTopicLevelDTO, or with status {@code 400 (Bad Request)} if the materialTopicLevel has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/material-topic-levels")
    public ResponseEntity<MaterialTopicLevelDTO> createMaterialTopicLevel(@RequestBody MaterialTopicLevelDTO materialTopicLevelDTO)
        throws URISyntaxException {
        log.debug("REST request to save MaterialTopicLevel : {}", materialTopicLevelDTO);
        if (materialTopicLevelDTO.getId() != null) {
            throw new BadRequestAlertException("A new materialTopicLevel cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MaterialTopicLevelDTO result = materialTopicLevelService.save(materialTopicLevelDTO);
        return ResponseEntity
            .created(new URI("/api/material-topic-levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /material-topic-levels/:id} : Updates an existing materialTopicLevel.
     *
     * @param id the id of the materialTopicLevelDTO to save.
     * @param materialTopicLevelDTO the materialTopicLevelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialTopicLevelDTO,
     * or with status {@code 400 (Bad Request)} if the materialTopicLevelDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the materialTopicLevelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/material-topic-levels/{id}")
    public ResponseEntity<MaterialTopicLevelDTO> updateMaterialTopicLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialTopicLevelDTO materialTopicLevelDTO
    ) throws URISyntaxException {
        log.debug("REST request to update MaterialTopicLevel : {}, {}", id, materialTopicLevelDTO);
        if (materialTopicLevelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialTopicLevelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialTopicLevelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MaterialTopicLevelDTO result = materialTopicLevelService.update(materialTopicLevelDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialTopicLevelDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /material-topic-levels/:id} : Partial updates given fields of an existing materialTopicLevel, field will ignore if it is null
     *
     * @param id the id of the materialTopicLevelDTO to save.
     * @param materialTopicLevelDTO the materialTopicLevelDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated materialTopicLevelDTO,
     * or with status {@code 400 (Bad Request)} if the materialTopicLevelDTO is not valid,
     * or with status {@code 404 (Not Found)} if the materialTopicLevelDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the materialTopicLevelDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/material-topic-levels/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MaterialTopicLevelDTO> partialUpdateMaterialTopicLevel(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MaterialTopicLevelDTO materialTopicLevelDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update MaterialTopicLevel partially : {}, {}", id, materialTopicLevelDTO);
        if (materialTopicLevelDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, materialTopicLevelDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!materialTopicLevelRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MaterialTopicLevelDTO> result = materialTopicLevelService.partialUpdate(materialTopicLevelDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, materialTopicLevelDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /material-topic-levels} : get all the materialTopicLevels.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of materialTopicLevels in body.
     */
    @GetMapping("/material-topic-levels")
    public List<MaterialTopicLevelDTO> getAllMaterialTopicLevels() {
        log.debug("REST request to get all MaterialTopicLevels");
        return materialTopicLevelService.findAll();
    }

    /**
     * {@code GET  /material-topic-levels/:id} : get the "id" materialTopicLevel.
     *
     * @param id the id of the materialTopicLevelDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the materialTopicLevelDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/material-topic-levels/{id}")
    public ResponseEntity<MaterialTopicLevelDTO> getMaterialTopicLevel(@PathVariable Long id) {
        log.debug("REST request to get MaterialTopicLevel : {}", id);
        Optional<MaterialTopicLevelDTO> materialTopicLevelDTO = materialTopicLevelService.findOne(id);
        return ResponseUtil.wrapOrNotFound(materialTopicLevelDTO);
    }

    /**
     * {@code DELETE  /material-topic-levels/:id} : delete the "id" materialTopicLevel.
     *
     * @param id the id of the materialTopicLevelDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/material-topic-levels/{id}")
    public ResponseEntity<Void> deleteMaterialTopicLevel(@PathVariable Long id) {
        log.debug("REST request to delete MaterialTopicLevel : {}", id);
        materialTopicLevelService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
